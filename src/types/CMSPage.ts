 export  interface CMSPage {
  _id?: string;
  title: string;
  slug: string;
  content?: string;
  status?: "draft" | "published";
}
