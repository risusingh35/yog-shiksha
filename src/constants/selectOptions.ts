export const DEPARTMENTS_NAME_OPTIONS = [
  { key: "user", value: "User" },
  { key: "developer", value: "Developer" },
  { key: "infra", value: "Infra" },
  { key: "hardware", value: "Hardware" },
  { key: "sales", value: "Sales" },
  { key: "asset", value: "Asset" },
  { key: "marketing", value: "Marketing" },
  { key: "finance", value: "Finance" },
  { key: "human_resources", value: "Human Resources" },
  { key: "legal", value: "Legal" },
  { key: "customer_support", value: "Customer Support" },
  { key: "project_management", value: "Project Management" },
  { key: "operations", value: "Operations" },
  { key: "rnd", value: "R&D" },
  { key: "administration", value: "Administration" },
];

export const ROLE_NAME_OPTIONS = [
  { key: "user", value: "User", department: "user" },
  { key: "readOnlyUser", value: "Read Only User", department: "user" },
  {
    key: "developer_intern ",
    value: "Intern Developer",
    department: "developer",
  },
  {
    key: "developer_junior",
    value: "Junior Developer",
    department: "developer",
  },
  {
    key: "developer_senior",
    value: "Senior Developer",
    department: "developer",
  },
  {
    key: "developer_tl",
    value: "Team Leader",
    department: "developer",
  },
  {
    key: "developer_mp",
    value: "Project Manager",
    department: "developer",
  },
  {
    key: "infra_engineer",
    value: "Infrastructure Engineer",
    department: "infra",
  },
  {
    key: "hardware_engineer",
    value: "Hardware Engineer",
    department: "hardware",
  },
  { key: "sales_executive", value: "Sales Executive", department: "sales" },
  { key: "asset_manager", value: "Asset Manager", department: "asset" },
  {
    key: "marketing_specialist",
    value: "Marketing Specialist",
    department: "marketing",
  },
  { key: "finance_analyst", value: "Finance Analyst", department: "finance" },
  { key: "hr_manager", value: "HR Manager", department: "human_resources" },
  { key: "legal_advisor", value: "Legal Advisor", department: "legal" },
  {
    key: "customer_support_representative",
    value: "Customer Support Representative",
    department: "customer_support",
  },
  {
    key: "operations_manager",
    value: "Operations Manager",
    department: "operations",
  },
  { key: "rnd_scientist", value: "R&D Scientist", department: "rnd" },
  {
    key: "administration_assistant",
    value: "Administration Assistant",
    department: "administration",
  },
];

export const ROLE_LEVEL_OPTIONS = Array.from({ length: 11 }, (_, index) => ({
  key: (`m` + index).toString(),
  value: `M-${index}`,
  id:index
}));
