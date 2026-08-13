export interface TechTag {
  name: string;
  category: "frontend" | "backend" | "database" | "deployment" | "security";
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Screenshot {
  id: string;
  label: string;
  description: string;
  aspectRatio: "landscape" | "portrait";
  /** Replace this with actual image path when available */
  placeholder: true;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  role: string;
  roleDescription: string;
  status: "live" | "in-progress" | "completed";
  liveUrl: string | null;
  techStack: TechTag[];
  features: Feature[];
  workflow: WorkflowStep[];
  screenshots: Screenshot[];
  caseStudyPath: string;
}

export interface Service {
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
