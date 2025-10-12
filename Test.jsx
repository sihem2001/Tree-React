import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  TextField,
  Select,
} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import axios from "axios";
import API_CONFIG from "../config";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

const Test = ({ services, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [types, setTypes] = useState([]);
  const [localParams, setLocalParams] = useState([]);

  // button style
  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: "40px",
    width: "40px",
    height: "40px",
  };

  // const disabledButtonStyle = {
  //   ...buttonBaseStyle,
  //   cursor: "not-allowed",
  //   opacity: 0.5,
  //   pointerEvents: "none",
  // };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#e8ecf1";
    e.currentTarget.style.borderColor = "#5e54e8";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#f5f7fa";
    e.currentTarget.style.borderColor = "#e0e0e0";
  };

  // get types from an API
  useEffect(() => {
    axios
      .post(API_CONFIG.types)
      .then((res) => {
        const typesData = res.data.jData || [];
        setTypes(typesData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedService?.params) {
      setLocalParams(
        selectedService.params.filter(
          (p) => p.paramId !== 0 && p.paramId !== null
        )
      );
    }
  }, [selectedService]);

  // verifier si le service a des params
  const hasValidParams = (srv) => {
    if (!srv.params || srv.params.length === 0) return false;
    return srv.params[0].paramId !== 0 && srv.params[0].paramId !== null;
  };

  const handleSaveAllNewParams = async () => {
    const newParams = localParams.filter((p) => p.isNew);

    if (newParams.length === 0) {
      alert("Aucun nouveau paramètre à sauvegarder");
      return;
    }

    // Validation: tous les noms doivent etre remplis
    const emptyParams = newParams.filter(
      (p) => !p.paramName || p.paramName.trim() === ""
    );
    if (emptyParams.length > 0) {
      alert(`${emptyParams.length} paramètre(s) n'ont pas de nom !`);
      return;
    }

    // Verifier les doublons parmi les nouveaux parametres
    const nameCount = {};
    newParams.forEach((p) => {
      const name = p.paramName.trim().toLowerCase();
      nameCount[name] = (nameCount[name] || 0) + 1;
    });

    const duplicateNames = Object.keys(nameCount).filter(
      (name) => nameCount[name] > 1
    );
    if (duplicateNames.length > 0) {
      alert(`Noms en double détectés : ${duplicateNames.join(", ")}`);
      return;
    }

    // Verifier les doublons avec les parametres existants
    const existingNames = localParams
      .filter((p) => !p.isNew)
      .map((p) => p.paramName.trim().toLowerCase());

    const conflictingNames = newParams
      .filter((p) => existingNames.includes(p.paramName.trim().toLowerCase()))
      .map((p) => p.paramName);

    if (conflictingNames.length > 0) {
      alert(`Ces noms existent déjà : ${conflictingNames.join(", ")}`);
      return;
    }

    try {
      // eenvoyer chaque nouveau paramètre au backend
      const promises = newParams.map((p) => {
        const payload = {
          drct: p.direction?.toString() || "1",
          name: p.paramName,
          note: p.note || "",
          req: p.must === 1 ? true : false,
          srv: selectedService.serviceId,
          typ: p.typ || 1,
        };

        console.log("📤 Envoi param:", payload);

        return axios.post(
          "https://sarah.digitarts.cloud/help/_params.php?do=add",
          payload
        );
      });

      const responses = await Promise.all(promises);
      console.log(
        "Tous les paramètres ajoutés:",
        responses.map((r) => r.data)
      );

      // Mettre a jour les IDs des parametres avec ceux retournés par le serveur
      setLocalParams((prev) =>
        prev.map((p) => {
          if (p.isNew) {
            const response = responses.find(
              (_, i) => newParams[i].paramId === p.paramId
            );
            return {
              ...p,
              paramId: response?.data?.paramId || p.paramId,
              isNew: false,
            };
          }
          return p;
        })
      );

      alert(`${newParams.length} paramètre(s) ajouté(s) avec succès !`);
      onRefresh?.();
    } catch (error) {
      console.error(" Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout des paramètres");
    }
  };
  // Fonction pour mettre a jour un param existant
  const handleUpdateExistingParam = async (paramId, field, value) => {
    // Verification des doublons uniquement pour le champ paramName
    if (field === "paramName") {
      const trimmedValue = value.trim().toLowerCase();

      // Vérifier s'il y a des doublons (exclure le paramètre actuel)
      const hasDuplicates = localParams.some(
        (p) =>
          p.paramId !== paramId &&
          p.paramName &&
          p.paramName.trim().toLowerCase() === trimmedValue
      );

      if (hasDuplicates) {
        alert("Ce nom de paramètre existe déjà !");

        // Revenir à la valeur précédente
        const previousParam = localParams.find((p) => p.paramId === paramId);
        setLocalParams((prev) =>
          prev.map((p) =>
            p.paramId === paramId
              ? { ...p, [field]: previousParam?.paramName || "" }
              : p
          )
        );
        return; // Arrêter l'exécution
      }

      // Vérifier que le nom n'est pas vide
      if (trimmedValue === "") {
        alert("Le nom du paramètre ne peut pas être vide !");

        // Revenir à la valeur précédente
        const previousParam = localParams.find((p) => p.paramId === paramId);
        setLocalParams((prev) =>
          prev.map((p) =>
            p.paramId === paramId
              ? { ...p, [field]: previousParam?.paramName || "" }
              : p
          )
        );
        return;
      }
    }

    // Mettre a jour localement
    setLocalParams((prev) =>
      prev.map((p) => (p.paramId === paramId ? { ...p, [field]: value } : p))
    );

    const fieldMap = {
      paramName: "name",
      typ: "typ",
      must: "must",
      direction: "direction",
      note: "note",
    };
    const backendField = fieldMap[field] || field;

    let url = `https://sarah.digitarts.cloud/help/_params.php?do=upd&srv=${selectedService.serviceId}`;
    let payload = { att: backendField, id: paramId, val: value };

    if (field === "typ") {
      url = `https://sarah.digitarts.cloud/help/_params.php?do=settyps`;
      payload = { id: paramId, typ: value };
    }

    try {
      await axios.post(url, payload);
      onRefresh?.();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour du paramètre");

      // En cas d'erreur, recharger les donnees pour eviter les incoherences
      onRefresh?.();
    }
  };
  // Fonction de gestion des changements (update uniquement pour params existants)
  const handleParamChange = async (paramId, isNew, field, value) => {
    if (isNew) {
      // Pour les nouveaux params, juste mettre a jour localement
      setLocalParams((prev) =>
        prev.map((p) => (p.paramId === paramId ? { ...p, [field]: value } : p))
      );
    } else {
      // Pour les params existants, update immediat
      await handleUpdateExistingParam(paramId, field, value);
    }
  };

  const handleOpen = (srv) => {
    setSelectedService(srv);
    setOpen(true);

    if (!hasValidParams(srv)) {
      const tempId = Date.now();
      const newParam = {
        paramId: tempId,
        paramName: "",
        typ: 1,
        direction: 1,
        must: 0,
        note: "",
        isNew: true,
      };
      setLocalParams([newParam]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
    setLocalParams([]);
  };

  // inline add
  const handleInlineAddParam = () => {
    const tempId = Date.now();
    const newParam = {
      paramId: tempId,
      paramName: "",
      typ: 1,
      direction: "",
      must: 0,
      note: "",
      isNew: true,
    };
    setLocalParams((prev) => [...prev, newParam]);
  };

  // Compter les nouveaux paramètres
  const newParamsCount = localParams.filter((p) => p.isNew).length;

  return (
    <>
      {services.map((srv) => {
        const hasParams = hasValidParams(srv);
        return (
          <div key={srv.serviceId} style={{ marginBottom: "19px" }}>
            <div
              onClick={() => handleOpen(srv)}
              style={{
                ...buttonBaseStyle,
                backgroundColor: hasParams ? "#f5f7fa" : "#9e9e9e16",
                borderColor: hasParams ? "#e0e0e0" : "#9e9e9e33",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {hasParams ? (
                <TextSnippetIcon
                  style={{
                    fontSize: "20px",
                    color: "#5e54e8",
                  }}
                />
              ) : (
                <AddIcon
                  style={{
                    fontSize: "20px",
                    color: "#5e54e8",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { p: 2, borderRadius: 3, minHeight: "500px" },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selectedService?.serviceName}
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleInlineAddParam}
            >
              + Ajouter un paramètre
            </Button>
            {newParamsCount > 0 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSaveAllNewParams}
                startIcon={<SaveIcon />}
              >
                Sauvegarder ({newParamsCount})
              </Button>
            )}
          </div>
        </DialogTitle>

        <DialogContent sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "25%" }}>Name</TableCell>
                <TableCell sx={{ width: "15%" }}>Type</TableCell>
                <TableCell sx={{ width: "20%" }}>Direction</TableCell>
                <TableCell sx={{ width: "6%" }}>Requis</TableCell>
                <TableCell sx={{ width: "30%" }}>Note</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {localParams.map((p) => (
                <TableRow
                  key={p.paramId}
                  sx={{
                    backgroundColor: p.isNew ? "#fff9c4" : "transparent",
                  }}
                >
                  <TableCell>
                    <TextField
                      value={p.paramName || ""}
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        setLocalParams((prev) =>
                          prev.map((param) =>
                            param.paramId === p.paramId
                              ? { ...param, paramName: e.target.value }
                              : param
                          )
                        )
                      }
                      onBlur={(e) =>
                        !p.isNew &&
                        handleParamChange(
                          p.paramId,
                          p.isNew,
                          "paramName",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  {/* types */}
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={p.typ || ""}
                        onChange={(e) =>
                          handleParamChange(
                            p.paramId,
                            p.isNew,
                            "typ",
                            e.target.value
                          )
                        }
                      >
                        {types.map((t) => (
                          <MenuItem key={t.id} value={t.id}>
                            {t.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  {/* direction */}
                  <TableCell>
                    <RadioGroup
                      row
                      value={p.direction?.toString() || "1"}
                      onChange={(e) =>
                        handleParamChange(
                          p.paramId,
                          p.isNew,
                          "direction",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="In"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Out"
                      />
                    </RadioGroup>
                  </TableCell>

                  {/* requis */}
                  <TableCell align="center">
                    <Checkbox
                      checked={p.must === 1}
                      onChange={(e) =>
                        handleParamChange(
                          p.paramId,
                          p.isNew,
                          "must",
                          e.target.checked ? 1 : 0
                        )
                      }
                    />
                  </TableCell>

                  {/* notes */}
                  <TableCell>
                    <TextField
                      value={p.note || ""}
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        setLocalParams((prev) =>
                          prev.map((param) =>
                            param.paramId === p.paramId
                              ? { ...param, note: e.target.value }
                              : param
                          )
                        )
                      }
                      onBlur={(e) =>
                        !p.isNew &&
                        handleParamChange(
                          p.paramId,
                          p.isNew,
                          "note",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Test;
