export interface ProjectLink {
    label: string;
    href: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    links: ProjectLink[];
    meta?: string;
    badge?: string;
}

export interface SideProject {
    title: string;
    meta: string;
    description: string;
    tags: string[];
    href?: string;
}

// Main projects: shown on the home page and at the top of /projects.
// TODO: add the "Article" (AlternanceRadar) and "Report" (Credit Risk) links once they exist.
export const projects: Project[] = [
    {
        title: "AlternanceRadar",
        meta: "2026 · in progress",
        description: "Backend for tracking apprenticeship offers: aggregation, deduplication and application tracking. Layered architecture, REST API.",
        tags: ["Java", "Spring Boot", "REST", "SQL"],
        links: [{ label: "Code", href: "https://github.com/styvvve/alternance_radar" }],
    },
    {
        title: "Credit Risk Analytics",
        badge: "Data · ML",
        description: "Credit risk analysis: borrower data exploration, feature engineering and default-risk modelling, documented in Jupyter notebooks.",
        tags: ["Python", "Jupyter", "pandas"],
        links: [{ label: "Code", href: "https://github.com/styvvve/Credit-Risk-Analytics" }],
    },
    {
        title: "Time Manager",
        meta: "Epitech · team",
        description: "Web app for tracking working hours, built in a team. I handled most of the backend (APIs, authentication) and part of the frontend.",
        tags: ["React", "Express.js", "REST"],
        links: [{ label: "Code", href: "https://github.com/PierreValadeau/time-manager" }],
    },
];

// Smaller projects: grid on /projects only.
// Add an `href` to a project to make its card a link.
export const sideProjects: SideProject[] = [
    {
        title: "Agent Reliability Lab",
        meta: "in progress",
        description: "Local notes assistant that answers from your own files and cites its sources. Runs on Ollama.",
        tags: ["Python", "Ollama", "LLM"],
    },
    {
        title: "Hackathon Mobility",
        meta: "2026 · hackathon",
        description: "Analysis of Citiz car-sharing data in Bordeaux and a mobility dashboard. Epitech × Citiz.",
        tags: ["Python", "pandas"],
    },
    {
        title: "Ligue 1 match predictor",
        meta: "paused",
        description: "Match outcome prediction with XGBoost, plus an LLM agent for scouting questions.",
        tags: ["Python", "XGBoost", "Claude API"],
    },
    {
        title: "Katika237",
        meta: "contributor",
        description: "Open-source civic data platform on Cameroon. First contribution: Dockerfile and tests.",
        tags: ["Open source", "Docker"],
    },
    {
        title: "Distributed systems",
        meta: "UPPA · team",
        description: "Distributed algorithms: sockets, RMI, Lamport clocks and global state.",
        tags: ["Java", "C", "RMI"],
    },
    {
        title: "EduLink",
        meta: "side project",
        description: "Tutor/student platform for Cameroon, an entrepreneurial project.",
        tags: ["SaaS"],
    },
];
