
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
const Main = async () => {
  try {
    await database.category.createMany({
      data: [
        { categoryTitle: "Software Engineering" },
        { categoryTitle: "Data Science" },
        { categoryTitle: "Project Management" },
        { categoryTitle: "Graphic Design" },
        { categoryTitle: "Marketing" },
        { categoryTitle: "Sales" },
        { categoryTitle: "Human Resources" },
        { categoryTitle: "Finance" },
        { categoryTitle: "Customer Support" },
        { categoryTitle: "Product Management" },
        { categoryTitle: "Web Development" },
        { categoryTitle: "Mobile Development" },
        { categoryTitle: "Cybersecurity" },
        { categoryTitle: "Content Writing" },
        { categoryTitle: "Social Media Management" },
        { categoryTitle: "Research & Development" },
        { categoryTitle: "Operations" },
        { categoryTitle: "Quality Assurance" },
        { categoryTitle: "Data Analysis" },
        { categoryTitle: "Training & Development" },
        { categoryTitle: "Legal Services" },
        { categoryTitle: "Supply Chain Management" },
        { categoryTitle: "Healthcare" },
        { categoryTitle: "Public Relations" },
        { categoryTitle: "Consulting" },
        { categoryTitle: "Architecture" },
        { categoryTitle: "Event Planning" },
        { categoryTitle: "Insurance" },
        { categoryTitle: "Teaching & Education" },
        { categoryTitle: "Environmental Science" },
        { categoryTitle: "Retail Management" },
      ],
    });
    console.log("created sucessfully")

  } catch (error) {
    console.log(error);
  }
};

Main()
