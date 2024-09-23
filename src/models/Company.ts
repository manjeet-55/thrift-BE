import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isHQ: boolean;
}

interface ISocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

interface IMedia {
  type: "image" | "video";
  url: string;
  description?: string;
}

interface IArticle {
  title: string;
  link: string;
  publishedDate: Date;
}

export interface ICompany extends Document {
  name: string;
  website: string;
  snapshot: string;
  size: string;
  specialisms: string[];
  address: IAddress[];
  mission: string;
  pitch: string;
  benefits: string[];
  values: string[];
  founders: string[];
  sponsorshipOpportunities: string[];
  articles: IArticle[];
  media: IMedia[];
  coverImage: string;
  logo: string;
  socialLinks: ISocialLinks;
}

const AddressSchema: Schema<IAddress> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  isHQ: { type: Boolean, default: false },
});

const MediaSchema: Schema<IMedia> = new Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  url: { type: String, required: true },
  description: { type: String },
});

const ArticleSchema: Schema<IArticle> = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  publishedDate: { type: Date, required: true },
});

const SocialLinksSchema: Schema<ISocialLinks> = new Schema({
  linkedin: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
});

const CompanySchema: Schema<ICompany> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    website: { type: String, required: true },
    snapshot: { type: String, required: false },
    size: { type: String, required: false },
    specialisms: [{ type: String }],
    address: [AddressSchema],
    mission: { type: String, required: false },
    pitch: { type: String, required: false },
    benefits: [{ type: String }],
    values: [{ type: String }],
    founders: [{ type: String }],
    sponsorshipOpportunities: [{ type: String }],
    articles: [ArticleSchema],
    media: [MediaSchema],
    coverImage: { type: String, required: false },
    logo: { type: String, required: false },
    socialLinks: SocialLinksSchema,
  },
  { timestamps: true }
);

const Company = mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
