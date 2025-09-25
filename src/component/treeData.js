// Sample organizational tree data
export const treeData = [
  {
    id: 1,
    name: "Sarah ",
    role: "Manager",
    description: "department of production",
    avatarUrl:
      "https://i.pinimg.com/736x/e9/3c/e7/e93ce71620845fd40020fb0b109bca47.jpg",
    children: [
      {
        id: 2,
        name: "Foreman",
        role: "Chief Technology Officer",
        description: "Tdepartment of fabrication",
        avatarUrl:
          "https://cdn.pixabay.com/photo/2024/03/30/15/35/ai-generated-8664928_1280.jpg",
        children: [
          {
            id: 3,
            name: "Emily Rodriguez",
            role: "worker",
            description: "Full-stack development and architecture",
            avatarUrl:
              "https://cdn.pixabay.com/photo/2024/06/03/19/03/ai-generated-8807157_1280.png",
            children: [
              {
                id: 4,
                name: "Alex Kim",
                role: "Frontend Developer",
                description: "React and UI/UX implementation",
                avatarUrl:
                  "https://t3.ftcdn.net/jpg/07/06/75/58/240_F_706755885_FskEDNBmlyFpksfPCFPw8bGF46ChR28H.jpg",
                children: [],
              },
              {
                id: 5,
                name: "Lisa Wang",
                role: "Backend Developer",
                description: "API development and database design",
                avatarUrl:
                  "https://as1.ftcdn.net/v2/jpg/09/94/76/20/1000_F_994762022_TKtWX6AeMJEpx4AkFqggACuAwhABtych.jpg",
                children: [],
              },
            ],
          },
          {
            id: 6,
            name: "David Thompson",
            role: "DevOps Engineer",
            description: "Infrastructure and deployment automation",
            avatarUrl:
              "https://as2.ftcdn.net/v2/jpg/09/94/76/19/1000_F_994761974_5uZv8p1BPrUr1hjxvauFZxMTNVeQwnb2.jpg",
            children: [],
          },
        ],
      },
      {
        id: 7,
        name: "Jennifer Martinez",
        role: "Chief Marketing Officer",
        description: "Brand strategy and customer acquisition",
        avatarUrl:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        children: [
          {
            id: 8,
            name: "Robert Brown",
            role: "Digital Marketing Manager",
            description: "Online campaigns and social media",
            avatarUrl:
              "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            children: [],
          },
          {
            id: 9,
            name: "Amanda Davis",
            role: "Content Marketing Specialist",
            description: "Content creation and SEO strategy",
            avatarUrl:
              "https://as2.ftcdn.net/v2/jpg/06/48/40/81/1000_F_648408135_F6V5eXrXdfNZ61rALbMF1gC7QE9LoHz7.jpg",
            children: [],
          },
        ],
      },
      {
        id: 10,
        name: "James Wilson",
        role: "Chief Financial Officer",
        description: "Financial planning and operations",
        avatarUrl:
          "https://as2.ftcdn.net/v2/jpg/06/48/40/81/1000_F_648408189_qoA7RtPl13FQvQUVb1OzkOanvUFjQTWd.jpg",
        children: [
          {
            id: 11,
            name: "Maria Garcia",
            role: "Senior Accountant",
            description: "Financial reporting and analysis",
            avatarUrl:
              "https://as2.ftcdn.net/v2/jpg/06/48/40/81/1000_F_648408154_nxxXvKPQzxu1yn17ZwWItUe3qr5ayLQ3.jpg",
            children: [],
          },
        ],
      },
    ],
  },
];

export const config = {
  showAvatars: true,
};
