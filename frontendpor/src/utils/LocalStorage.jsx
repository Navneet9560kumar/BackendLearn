const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        title: "Design Homepage",
        description: "Create the homepage layout for the new project",
        date: "2025-10-12",
        category: "Design",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Fix Login Bug",
        description: "Resolve issue with login form validation",
        date: "2025-10-10",
        category: "Development",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Write Unit Tests",
        description: "Add unit tests for user authentication",
        date: "2025-10-11",
        category: "Testing",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        title: "Database Optimization",
        description: "Optimize SQL queries for faster response",
        date: "2025-10-09",
        category: "Database",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Update Dashboard",
        description: "Add new charts to admin dashboard",
        date: "2025-10-08",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Refactor Codebase",
        description: "Clean and organize code for maintainability",
        date: "2025-10-07",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Client Meeting",
        description: "Discuss project requirements with client",
        date: "2025-10-06",
        category: "Management",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        title: "Create API Endpoints",
        description: "Develop endpoints for user management",
        date: "2025-10-11",
        category: "Backend",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Fix CSS Issues",
        description: "Resolve styling problems in responsive layout",
        date: "2025-10-10",
        category: "Frontend",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        title: "Prepare Documentation",
        description: "Write technical documentation for API",
        date: "2025-10-12",
        category: "Documentation",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Code Review",
        description: "Review PRs from junior developers",
        date: "2025-10-11",
        category: "Development",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Optimize Images",
        description: "Compress images for faster load time",
        date: "2025-10-10",
        category: "Frontend",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        title: "Setup CI/CD",
        description: "Configure GitHub Actions for automated builds",
        date: "2025-10-12",
        category: "DevOps",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Test API",
        description: "Test endpoints using Postman",
        date: "2025-10-11",
        category: "Testing",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Client Feedback",
        description: "Collect feedback and update features",
        date: "2025-10-10",
        category: "Management",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
      {
        title: "Update Dependencies",
        description: "Upgrade NPM packages to latest version",
        date: "2025-10-09",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
    tasks: [
      {
        title: "Review Employee Tasks",
        description: "Check all employee progress for the week",
        date: "2025-10-12",
        category: "Management",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees)); // localstorge mai store karne ke leyi ye use karte hai ham or kaam ho jata hai sara (JSON.stringify = json data jo hai use string mai convert kar deta hai))
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin")) || [];
//   return { employees: employees, admin };
      return { employees, admin };
};
