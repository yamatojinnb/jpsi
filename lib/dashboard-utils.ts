// Dashboard utility functions for data processing

export interface Position {
  ClientAccountID: string;
  AssetClass: string;
  Symbol: string;
  UnderlyingSymbol: string;
  Multiplier: number;
  Strike?: number;
  Expiry?: number;
  "Put/Call"?: string;
  ReportDate: number;
  Quantity: number;
  MarkPrice: number;
  PositionValue: number;
  大学名: string;
  国: string;
  氏名: string;
  GICS_Sector: string;
}

export interface Order {
  ClientAccountID: string;
  AssetClass: string;
  Symbol: string;
  UnderlyingSymbol: string;
  Multiplier: number;
  Strike?: number;
  Expiry?: number;
  "Put/Call"?: string;
  OrderID: number;
  TradeDate: number;
  "Buy/Sell": string;
  Quantity: number;
  Price: number;
  Amount: number;
  NetCash: number;
  LevelOfDetail: string;
  大学名: string;
  国: string;
  氏名: string;
  GICS_Sector: string;
}

export interface Performance {
  Key: string;
  ClientAccountID: string;
  ReportDate: number;
  Cash: number;
  CashLong: number;
  CashShort: number;
  Stock: number;
  StockLong: number;
  StockShort: number;
  Options: number;
  OptionsLong: number;
  OptionsShort: number;
  Total: number;
  TotalLong: number;
  TotalShort: number;
}

// Team mapping: University name -> Account IDs
export const TEAM_ACCOUNT_MAP: { [key: string]: string[] } = {
  "University of Alberta": ["DUO858010", "DUO858142", "DUO858153"],
  "Technical University of Munich": ["DUO858167", "DUO858183", "DUO858195"],
  "RWTH Aachen University": ["DUO858204", "DUO858213", "DUO858216"],
  "Indian Institute of Technology Roorkee": ["DUO858223", "DUO858241", "DUO858245"],
  "The University of New South Wales": ["DUO880904", "DUO858252", "DUO858257"],
  "The University of Sheffield": ["DUO858271", "DUO858280", "DUO858287"],
  "The National University Of Malaysia": ["DUO858293", "DUO858308", "DUO858311"],
  "University of Delhi": ["DUO858320", "DUO858325", "DUO858332"],
  "University of Toronto": ["DUO858340", "DUO858345", "DUO858355"],
  "Roger Williams University": ["DUO858565", "DUO858573", "DUO858580"],
  "Waseda University": ["DUO858694", "DUO858706", "DUO858732"],
  "University of Geneva": ["DUO858779", "DUO858786", "DUO858796"],
  "Ludwig Maximilian University of Munich": ["DUO860400", "DUO860184", "DUO860245"],
  "University of California, Los Angeles": ["DUO859247", "DUO859340", "DUO859347"],
};

// Country mapping
export const UNIVERSITY_COUNTRY_MAP: { [key: string]: string } = {
  "University of Alberta": "Canada",
  "Technical University of Munich": "Germany",
  "RWTH Aachen University": "Germany",
  "Indian Institute of Technology Roorkee": "India",
  "The University of New South Wales": "Australia",
  "The University of Sheffield": "United Kingdom",
  "The National University Of Malaysia": "Malaysia",
  "University of Delhi": "India",
  "University of Toronto": "Canada",
  "Roger Williams University": "United States",
  "Waseda University": "Japan",
  "University of Geneva": "Switzerland",
  "Ludwig Maximilian University of Munich": "Germany",
  "University of California, Los Angeles": "United States",
};

// Country flag emojis
export const COUNTRY_FLAGS: { [key: string]: string } = {
  "Canada": "🇨🇦",
  "Germany": "🇩🇪",
  "India": "🇮🇳",
  "Australia": "🇦🇺",
  "United Kingdom": "🇬🇧",
  "Malaysia": "🇲🇾",
  "United States": "🇺🇸",
  "Japan": "🇯🇵",
  "Switzerland": "🇨🇭",
};

// Sector color mapping
export const SECTOR_COLORS: { [key: string]: string } = {
  "Information Technology": "#3b82f6",
  "Health Care": "#a855f7",
  "Financials": "#f59e0b",
  "Consumer Discretionary": "#ec4899",
  "Communication Services": "#06b6d4",
  "Industrials": "#6366f1",
  "Consumer Staples": "#22c55e",
  "Energy": "#ef4444",
  "Utilities": "#84cc16",
  "Real Estate": "#f97316",
  "Materials": "#8b5cf6",
  "ETF/Index": "#64748b",
  "Options": "#a1a1aa",
  "Unknown": "#52525b",
};

// Date utilities
export function parseDate(dateInt: number): Date {
  const str = dateInt.toString();
  const year = parseInt(str.substring(0, 4));
  const month = parseInt(str.substring(4, 6)) - 1;
  const day = parseInt(str.substring(6, 8));
  return new Date(year, month, day);
}

/** Format a Date as local YYYY-MM-DD (avoids UTC shift from toISOString). */
export function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDate(dateInt: number): string {
  const date = parseDate(dateInt);
  return formatDateLocal(date);
}

export function getWeekNumber(date: Date, startDate: Date = new Date(2025, 11, 17)): number {
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  return new Date(d.setDate(diff));
}

export function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
}

// TWR calculation
export function calculateTWR(
  performanceData: Performance[],
  teamAccountIds: string[],
  startNAV: number = 3000000
): { date: Date; twr: number; cumulativeTWR: number }[] {
  // Filter performance data for team accounts (exclude data before 2025-12-17)
  const teamData = performanceData.filter((p) =>
    teamAccountIds.includes(p.ClientAccountID) && p.ReportDate >= 20251217
  );

  // Group by date and sum NAV
  const dailyNAV: { [date: number]: number } = {};
  teamData.forEach((p) => {
    if (!dailyNAV[p.ReportDate]) {
      dailyNAV[p.ReportDate] = 0;
    }
    dailyNAV[p.ReportDate] += p.Total || 0;
  });

  // Sort dates
  const dates = Object.keys(dailyNAV)
    .map(Number)
    .sort((a, b) => a - b);

  // Calculate daily returns and cumulative TWR
  let cumulativeTWR = 0;
  const result: { date: Date; twr: number; cumulativeTWR: number }[] = [];
  let prevNAV = startNAV;

  dates.forEach((dateInt, index) => {
    const currentNAV = dailyNAV[dateInt];
    if (index === 0) {
      // First day: use start NAV
      const dailyReturn = (currentNAV - startNAV) / startNAV;
      cumulativeTWR = dailyReturn;
      result.push({
        date: parseDate(dateInt),
        twr: dailyReturn * 100,
        cumulativeTWR: cumulativeTWR * 100,
      });
      prevNAV = currentNAV;
    } else {
      const dailyReturn = (currentNAV - prevNAV) / prevNAV;
      cumulativeTWR = (1 + cumulativeTWR) * (1 + dailyReturn) - 1;
      result.push({
        date: parseDate(dateInt),
        twr: dailyReturn * 100,
        cumulativeTWR: cumulativeTWR * 100,
      });
      prevNAV = currentNAV;
    }
  });

  return result;
}

// Weekly TWR calculation
export function calculateWeeklyTWR(
  twrData: { date: Date; twr: number; cumulativeTWR: number }[]
): { week: number; weeklyTWR: number; cumulativeTWR: number }[] {
  const weeklyData: { [week: number]: number[] } = {};

  twrData.forEach((entry) => {
    const week = getWeekNumber(entry.date);
    if (!weeklyData[week]) {
      weeklyData[week] = [];
    }
    weeklyData[week].push(entry.twr / 100); // Convert back to decimal
  });

  const result: { week: number; weeklyTWR: number; cumulativeTWR: number }[] = [];
  let cumulative = 0;

  Object.keys(weeklyData)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((week) => {
      const dailyReturns = weeklyData[week];
      const weeklyReturn = dailyReturns.reduce((acc, ret) => acc * (1 + ret), 1) - 1;
      cumulative = (1 + cumulative) * (1 + weeklyReturn) - 1;
      result.push({
        week,
        weeklyTWR: weeklyReturn * 100,
        cumulativeTWR: cumulative * 100,
      });
    });

  return result;
}

// Get team accounts from university name
export function getTeamAccounts(university: string): string[] {
  return TEAM_ACCOUNT_MAP[university] || [];
}

// Get all universities
export function getAllUniversities(): string[] {
  return Object.keys(TEAM_ACCOUNT_MAP);
}

// Filter positions by team and date range
export function filterPositionsByTeam(
  positions: Position[],
  teamAccounts: string[],
  startDate?: number,
  endDate?: number
): Position[] {
  return positions.filter((p) => {
    if (!teamAccounts.includes(p.ClientAccountID)) return false;
    if (p.ReportDate < 20251217) return false; // exclude data before display start 12/17
    if (startDate && p.ReportDate < startDate) return false;
    if (endDate && p.ReportDate > endDate) return false;
    return true;
  });
}

// Filter orders by team and date range
export function filterOrdersByTeam(
  orders: Order[],
  teamAccounts: string[],
  startDate?: number,
  endDate?: number
): Order[] {
  return orders.filter((o) => {
    if (!teamAccounts.includes(o.ClientAccountID)) return false;
    if (startDate && o.TradeDate < startDate) return false;
    if (endDate && o.TradeDate > endDate) return false;
    return true;
  });
}

// Calculate sector allocation for a week
export function calculateSectorAllocation(
  positions: Position[],
  weekStart: Date,
  weekEnd: Date
): { sector: string; value: number; percentage: number }[] {
  const weekStartInt = parseInt(
    `${weekStart.getFullYear()}${String(weekStart.getMonth() + 1).padStart(2, "0")}${String(weekStart.getDate()).padStart(2, "0")}`
  );
  const weekEndInt = parseInt(
    `${weekEnd.getFullYear()}${String(weekEnd.getMonth() + 1).padStart(2, "0")}${String(weekEnd.getDate()).padStart(2, "0")}`
  );

  // Get latest position for each account/symbol in the week
  const latestPositions: { [key: string]: Position } = {};
  positions.forEach((p) => {
    if (p.ReportDate >= weekStartInt && p.ReportDate <= weekEndInt) {
      const key = `${p.ClientAccountID}-${p.Symbol}`;
      if (!latestPositions[key] || p.ReportDate > latestPositions[key].ReportDate) {
        latestPositions[key] = p;
      }
    }
  });

  // Group by sector
  const sectorValues: { [sector: string]: number } = {};
  let totalValue = 0;

  Object.values(latestPositions).forEach((p) => {
    const sector = p.AssetClass === "OPT" ? "Options" : (p.GICS_Sector || "Unknown");
    if (!sectorValues[sector]) {
      sectorValues[sector] = 0;
    }
    sectorValues[sector] += p.PositionValue || 0;
    totalValue += p.PositionValue || 0;
  });

  // Convert to array and calculate percentages
  const result = Object.entries(sectorValues)
    .map(([sector, value]) => ({
      sector,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  return result;
}

// Check if trade is a day trade
export function isDayTrade(
  order: Order,
  allOrders: Order[]
): boolean {
  const sameDayOrders = allOrders.filter(
    (o) =>
      o.ClientAccountID === order.ClientAccountID &&
      o.UnderlyingSymbol === order.UnderlyingSymbol &&
      o.TradeDate === order.TradeDate &&
      o.OrderID !== order.OrderID
  );

  const hasOppositeSide = sameDayOrders.some(
    (o) => o["Buy/Sell"] !== order["Buy/Sell"]
  );

  return hasOppositeSide;
}

