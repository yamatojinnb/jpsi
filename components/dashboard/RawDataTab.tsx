"use client";

import { useState, useMemo } from "react";
import { Order, getTeamAccounts, filterOrdersByTeam, formatDate, isDayTrade } from "@/lib/dashboard-utils";

interface RawDataTabProps {
  selectedTeam: string;
  ordersData: Order[];
  allOrdersData: Order[];
}

type SortField = "Ticker" | "Sector" | "Side" | "Date" | "Member" | "Qty" | "Price" | "Amount" | "NetCash" | "AssetClass";
type SortDirection = "asc" | "desc";

export default function RawDataTab({ selectedTeam, ordersData, allOrdersData }: RawDataTabProps) {
  const [searchTicker, setSearchTicker] = useState("");
  const [sortField, setSortField] = useState<SortField>("Date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const teamAccounts = useMemo(
    () => getTeamAccounts(selectedTeam),
    [selectedTeam]
  );

  // Get team orders
  const teamOrders = useMemo(() => {
    if (!selectedTeam || teamAccounts.length === 0) return [];
    return filterOrdersByTeam(ordersData, teamAccounts);
  }, [selectedTeam, teamAccounts, ordersData]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = teamOrders;

    // Filter by ticker
    if (searchTicker.trim()) {
      const searchLower = searchTicker.toLowerCase().trim();
      filtered = filtered.filter(
        (o) =>
          o.UnderlyingSymbol?.toLowerCase().includes(searchLower) ||
          o.Symbol?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortField) {
        case "Ticker":
          aVal = a.UnderlyingSymbol || "";
          bVal = b.UnderlyingSymbol || "";
          break;
        case "Sector":
          aVal = a.GICS_Sector || "";
          bVal = b.GICS_Sector || "";
          break;
        case "Side":
          aVal = a["Buy/Sell"];
          bVal = b["Buy/Sell"];
          break;
        case "Date":
          aVal = a.TradeDate;
          bVal = b.TradeDate;
          break;
        case "Member":
          aVal = a.氏名 || "";
          bVal = b.氏名 || "";
          break;
        case "Qty":
          aVal = Math.abs(a.Quantity);
          bVal = Math.abs(b.Quantity);
          break;
        case "Price":
          aVal = a.Price;
          bVal = b.Price;
          break;
        case "Amount":
          aVal = Math.abs(a.Amount);
          bVal = Math.abs(b.Amount);
          break;
        case "NetCash":
          aVal = a.NetCash;
          bVal = b.NetCash;
          break;
        case "AssetClass":
          aVal = a.AssetClass;
          bVal = b.AssetClass;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
    });

    return sorted;
  }, [teamOrders, searchTicker, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 text-[#22c55e]">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
        <div className="flex items-center gap-6 flex-wrap">
          <input
            type="text"
            placeholder="Search by ticker..."
            value={searchTicker}
            onChange={(e) => setSearchTicker(e.target.value)}
            className="bg-[#09090b] border border-[#27272a] rounded px-4 py-2 text-[#fafafa] placeholder-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#22c55e] w-64"
          />
          <div className="flex items-center gap-4 text-xs text-[#a1a1aa]">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-[#22c55e] bg-opacity-20 border border-[#22c55e]"></span>
              <span>BUY</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-[#ef4444] bg-opacity-20 border border-[#ef4444]"></span>
              <span>SELL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-[#f59e0b] bg-opacity-20 border border-[#f59e0b]"></span>
              <span>Day Trade</span>
            </div>
            <span className="text-[#27272a]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-[#64748b] bg-opacity-20 border border-[#64748b]"></span>
              <span>STK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-[#a855f7] bg-opacity-20 border border-[#a855f7]"></span>
              <span>OPT</span>
            </div>
          </div>
          <div className="text-sm text-[#a1a1aa] ml-auto">
            {filteredAndSortedOrders.length} trade{filteredAndSortedOrders.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Trade History Table */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Ticker")}
                >
                  Ticker <SortIcon field="Ticker" />
                </th>
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Sector")}
                >
                  Sector <SortIcon field="Sector" />
                </th>
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Side")}
                >
                  Side <SortIcon field="Side" />
                </th>
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Date")}
                >
                  Date <SortIcon field="Date" />
                </th>
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Member")}
                >
                  Member <SortIcon field="Member" />
                </th>
                <th
                  className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Qty")}
                >
                  Qty <SortIcon field="Qty" />
                </th>
                <th
                  className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Price")}
                >
                  Price <SortIcon field="Price" />
                </th>
                <th
                  className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("Amount")}
                >
                  Amount <SortIcon field="Amount" />
                </th>
                <th
                  className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("NetCash")}
                >
                  Net Cash <SortIcon field="NetCash" />
                </th>
                <th
                  className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-[#fafafa] transition-colors"
                  onClick={() => handleSort("AssetClass")}
                >
                  Asset Class <SortIcon field="AssetClass" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedOrders.map((order) => {
                const dayTrade = isDayTrade(order, allOrdersData);
                return (
                  <tr
                    key={order.OrderID}
                    className="border-b border-[#27272a] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className="py-3 px-4 text-[#fafafa] font-medium">
                      {order.UnderlyingSymbol || order.Symbol}
                    </td>
                    <td className="py-3 px-4 text-[#a1a1aa]">{order.GICS_Sector || "—"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          order["Buy/Sell"] === "BUY"
                            ? "bg-[#22c55e] bg-opacity-20 text-[#22c55e]"
                            : "bg-[#ef4444] bg-opacity-20 text-[#ef4444]"
                        }`}
                      >
                        {order["Buy/Sell"]}
                      </span>
                      {dayTrade && (
                        <span className="ml-2 inline-block px-2 py-1 rounded text-xs font-medium bg-[#f59e0b] bg-opacity-20 text-[#f59e0b]">
                          DT
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#a1a1aa]">{formatDate(order.TradeDate)}</td>
                    <td className="py-3 px-4 text-[#a1a1aa]">{order.氏名 || "—"}</td>
                    <td className="py-3 px-4 text-right text-[#fafafa]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                      {Math.abs(order.Quantity).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right text-[#fafafa]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                      ${order.Price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-[#fafafa]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                      ${Math.abs(order.Amount).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        order.NetCash >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                      }`}
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      ${order.NetCash.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          order.AssetClass === "OPT"
                            ? "bg-[#a855f7] bg-opacity-20 text-[#a855f7]"
                            : "bg-[#64748b] bg-opacity-20 text-[#64748b]"
                        }`}
                      >
                        {order.AssetClass}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

