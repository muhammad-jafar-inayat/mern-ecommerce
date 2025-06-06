import { 
  users, 
  donations, 
  volunteers, 
  contacts, 
  wallLocations, 
  newsArticles,
  type User, 
  type InsertUser,
  type Donation,
  type InsertDonation,
  type Volunteer,
  type InsertVolunteer,
  type Contact,
  type InsertContact,
  type WallLocation,
  type NewsArticle
} from "@shared/schema";

import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  deleteDonation(id: string): Promise<void>;

  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  getVolunteers(): Promise<Volunteer[]>;
  deleteVolunteer(id: string): Promise<void>;

  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  deleteContact(id: string): Promise<void>;

  getWallLocations(): Promise<WallLocation[]>;
  getNewsArticles(): Promise<NewsArticle[]>;

  getStats(): Promise<{
    clothesCollected: number;
    familiesServed: number;
    wallsOfHope: number;
    volunteers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private async seedData() {
    try {
      const existingLocations = await db.select().from(wallLocations).limit(1);
      if (existingLocations.length > 0) return;

      const locations: Omit<WallLocation, 'id'>[] = [
        {
          name: "UET Main Campus",
          address: "GT Road, Lahore",
          latitude: "31.5804",
          longitude: "74.3587",
          status: "active",
          lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          name: "Jamia Mosque Gulberg",
          address: "Main Boulevard, Gulberg III",
          latitude: "31.5204",
          longitude: "74.3587",
          status: "active",
          lastRestocked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          name: "Bus Stop Katchi Abadi",
          address: "Ravi Road, Near Shama Colony",
          latitude: "31.6340",
          longitude: "74.3723",
          status: "needs_restock",
          lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        }
      ];

      await db.insert(wallLocations).values(locations);

      const articles: Omit<NewsArticle, 'id'>[] = [
        {
          title: "New Wall of Hope Opens at GCU Campus",
          excerpt: "Students from Government College University Lahore partnered with Re-Libas to establish the 13th Wall of Hope station, expanding our reach to serve more families...",
          content: "Full article content would go here...",
          category: "Installation",
          imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
          publishedAt: new Date("2024-03-15"),
        },
        {
          title: "1000+ Families Served in Winter Drive",
          excerpt: "Our winter collection drive successfully provided warm clothing to over 1000 families across Lahore, with special focus on children's winter wear and blankets...",
          content: "Full article content would go here...",
          category: "Impact Story",
          imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
          publishedAt: new Date("2024-03-12"),
        },
        {
          title: "Partnership with Local Mosques Expands",
          excerpt: "Re-Libas announces new partnerships with 15 mosques across Lahore to establish permanent Wall of Hope stations in underserved communities...",
          content: "Full article content would go here...",
          category: "Partnership",
          imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
          publishedAt: new Date("2024-03-10"),
        }
      ];

      await db.insert(newsArticles).values(articles);
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const result = await db.insert(donations).values(insertDonation).returning();
    return result[0];
  }

  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations).orderBy(donations.createdAt);
  }

  async deleteDonation(id: string): Promise<void> {
    await db.delete(donations).where(eq(donations.id, parseInt(id)));
  }

  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const result = await db.insert(volunteers).values(insertVolunteer).returning();
    return result[0];
  }

  async getVolunteers(): Promise<Volunteer[]> {
    return await db.select().from(volunteers).orderBy(volunteers.createdAt);
  }

  async deleteVolunteer(id: string): Promise<void> {
    await db.delete(volunteers).where(eq(volunteers.id, parseInt(id)));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async deleteContact(id: string): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, parseInt(id)));
  }

  async getWallLocations(): Promise<WallLocation[]> {
    return await db.select().from(wallLocations);
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return await db.select().from(newsArticles).orderBy(newsArticles.publishedAt);
  }

  async getStats(): Promise<{
    clothesCollected: number;
    familiesServed: number;
    wallsOfHope: number;
    volunteers: number;
  }> {
    const wallCount = await db.select().from(wallLocations);
    const volunteerCount = await db.select().from(volunteers);
    
    return {
      clothesCollected: 219,
      familiesServed: 107,
      wallsOfHope: wallCount.length,
      volunteers: volunteerCount.length + 125,
    };
  }
}

// Create an instance of the storage
export const storage = new DatabaseStorage();

// Export working delete functions
export const deleteDonation = (id: string) => storage.deleteDonation(id);
export const deleteVolunteer = (id: string) => storage.deleteVolunteer(id);
export const deleteContact = (id: string) => storage.deleteContact(id);
