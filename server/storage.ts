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

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  getVolunteers(): Promise<Volunteer[]>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getWallLocations(): Promise<WallLocation[]>;
  getNewsArticles(): Promise<NewsArticle[]>;
  getStats(): Promise<{
    clothesCollected: number;
    familiesServed: number;
    wallsOfHope: number;
    volunteers: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private donations: Map<number, Donation>;
  private volunteers: Map<number, Volunteer>;
  private contacts: Map<number, Contact>;
  private wallLocations: Map<number, WallLocation>;
  private newsArticles: Map<number, NewsArticle>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.donations = new Map();
    this.volunteers = new Map();
    this.contacts = new Map();
    this.wallLocations = new Map();
    this.newsArticles = new Map();
    this.currentId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed wall locations
    const locations: Omit<WallLocation, 'id'>[] = [
      {
        name: "UET Main Campus",
        address: "GT Road, Lahore",
        latitude: "31.5804",
        longitude: "74.3587",
        status: "active",
        lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        name: "Jamia Mosque Gulberg",
        address: "Main Boulevard, Gulberg III",
        latitude: "31.5204",
        longitude: "74.3587",
        status: "active",
        lastRestocked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        name: "Bus Stop Katchi Abadi",
        address: "Ravi Road, Near Shama Colony",
        latitude: "31.6340",
        longitude: "74.3723",
        status: "needs_restock",
        lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      }
    ];

    locations.forEach(location => {
      const id = this.currentId++;
      this.wallLocations.set(id, { id, ...location });
    });

    // Seed news articles
    const articles: Omit<NewsArticle, 'id'>[] = [
      {
        title: "New Wall of Hope Opens at GCU Campus",
        excerpt: "Students from Government College University Lahore partnered with Re-Libas to establish the 13th Wall of Hope station, expanding our reach to serve more families...",
        content: "Full article content would go here...",
        category: "Installation",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-03-15"),
      },
      {
        title: "1000+ Families Served in Winter Drive",
        excerpt: "Our winter collection drive successfully provided warm clothing to over 1000 families across Lahore, with special focus on children's winter wear and blankets...",
        content: "Full article content would go here...",
        category: "Impact Story",
        imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-03-12"),
      },
      {
        title: "Partnership with Local Mosques Expands",
        excerpt: "Re-Libas announces new partnerships with 15 mosques across Lahore to establish permanent Wall of Hope stations in underserved communities...",
        content: "Full article content would go here...",
        category: "Partnership",
        imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2024-03-10"),
      }
    ];

    articles.forEach(article => {
      const id = this.currentId++;
      this.newsArticles.set(id, { id, ...article });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.currentId++;
    const donation: Donation = {
      ...insertDonation,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const id = this.currentId++;
    const volunteer: Volunteer = {
      ...insertVolunteer,
      id,
      status: "active",
      createdAt: new Date(),
    };
    this.volunteers.set(id, volunteer);
    return volunteer;
  }

  async getVolunteers(): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = {
      ...insertContact,
      id,
      status: "unread",
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getWallLocations(): Promise<WallLocation[]> {
    return Array.from(this.wallLocations.values());
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return Array.from(this.newsArticles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getStats(): Promise<{
    clothesCollected: number;
    familiesServed: number;
    wallsOfHope: number;
    volunteers: number;
  }> {
    return {
      clothesCollected: 2547,
      familiesServed: 1230,
      wallsOfHope: this.wallLocations.size,
      volunteers: this.volunteers.size + 156, // Include existing volunteers
    };
  }
}

export const storage = new MemStorage();
