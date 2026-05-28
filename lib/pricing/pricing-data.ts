import type {
  ToolPricing,
} from "@/types/audit";

export const TOOL_PRICING: ToolPricing[] = [
  {
  tool: "ChatGPT",

  plans: [
    {
      name: "Free",

      monthlyPrice: 0,

      recommendedMinSeats: 1,

      recommendedMaxSeats: 1,
    },

    {
      name: "Plus",

      monthlyPrice: 20,

      recommendedMinSeats: 1,

      recommendedMaxSeats: 5,
    },

    {
      name: "Team",

      monthlyPrice: 25,

      recommendedMinSeats: 2,

      recommendedMaxSeats: 20,
    },

    {
      name: "Enterprise",

      monthlyPrice: 60,

      recommendedMinSeats: 21,
    },
  ],
},

  {
    tool: "Claude",

    category: "subscription",

    plans: [
      {
        name: "Pro",
        monthlyPrice: 20,
        recommendedMaxSeats: 2,
      },

      {
        name: "Team",
        monthlyPrice: 30,
        recommendedMinSeats: 3,
      },
    ],
  },

  {
    tool: "Cursor",

    category: "subscription",

    plans: [
      {
        name: "Pro",
        monthlyPrice: 20,
        recommendedMaxSeats: 5,
      },

      {
        name: "Business",
        monthlyPrice: 40,
        recommendedMinSeats: 6,
      },
    ],
  },

  {
    tool: "GitHub Copilot",

    category: "subscription",

    plans: [
      {
        name: "Individual",
        monthlyPrice: 10,
        recommendedMaxSeats: 1,
      },

      {
        name: "Business",
        monthlyPrice: 19,
        recommendedMinSeats: 2,
      },
    ],
  },

  {
    tool: "Gemini",

    category: "subscription",

    plans: [
      {
        name: "Pro",
        monthlyPrice: 20,
      },
    ],
  },
];