export interface Image {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface Document {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
}

export interface ProjectDocument {
  id: number;
  title: string;
  type: string;
  file: {
    data: Document;
  };
  link: string;
}

export interface Authors {
  name: string;
  id: number;
}

export interface OtherPublication {
  title: string;
  link: string;
  type: string;
  date: string;
}

export interface CourseTypes {
  attributes: {
    title: string;
    summary: string;
    content: string;
    locale: string;
    semester: string;
    semesters: [string];
    university: string;
    level: string;
    instructors: {
      data: TeamTypes[];
    };
  };
  id: number;
}

export interface NewsTypes {
  attributes: {
    title: string;
    summary: string;
    content: string;
    date: string;
    locale: string;
    image: Image;
    link: string;
    slug: string;
  };
  id: number;
}

export interface PageTypes {
  attributes: {
    title: string;
    summary: string;
    slug: string;
  };
  id: number;
}

export interface TeamTypes {
  attributes: {
    name: number;
    position: string;
    pronouns: string;
    bio: string;
    email: string;
    image: Image;
    publications: {
      data: PublicationTypes[];
    };
    projects: {
      data: ProjectTypes[];
    };
    otherPublications: OtherPublication[];
    locale: string;
    slug: string;
  };
  id: number;
}

export interface PublicationTypes {
  attributes: {
    title: string;
    date: string;
    abstract?: string;
    summary?: string;
    type: string;
    file?: {
      data: Document;
    };
    authors?: Authors[];
    project?: ProjectTypes[];
    team?: {};
    image?: Image;
    link: string;
    slug?: string;
    locale?: string;
    reference?: string;
  };
  id?: number;
}

export interface ProjectTypes {
  attributes: {
    title: string;
    summary: string;
    type: string;
    ongoing: boolean;
    content: string;
    slug: string;
    funding: string;
    image: Image;
    publications: {
      data: PublicationTypes[];
    };
    locale: string;
    documents: ProjectDocument[];
  };
  id: number;
}

export interface HomepageTypes {
  attributes: {
    info: {
      title: string;
      summary: string;
    };
    heroText: string;
    content: string;
  };
}
