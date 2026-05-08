"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FilterGroup {
  label: string;
  icon?: string;
  options: { value: string; label: string; count?: number }[];
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  selected?: Record<string, string[]>;
  onFilterChange?: (groupLabel: string, values: string[]) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterSidebar({
  groups,
  selected: controlledSelected,
  onFilterChange,
  onClearAll,
  className,
}: FilterSidebarProps) {
  const [internalSelected, setInternalSelected] = useState<
    Record<string, string[]>
  >({});
  const selected = controlledSelected ?? internalSelected;

  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    groups.map((g) => g.label)
  );

  function toggleExpanded(label: string) {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }

  const toggleOption = useCallback(
    (groupLabel: string, value: string) => {
      const current = selected[groupLabel] ?? [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (onFilterChange) {
        onFilterChange(groupLabel, updated);
      } else {
        setInternalSelected((prev) => ({ ...prev, [groupLabel]: updated }));
      }
    },
    [selected, onFilterChange]
  );

  const totalActive = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <aside
      className={cn("space-y-6", className)}
      aria-label="Filtros de productos"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-primary text-lg font-bold">
          Filtros
        </h2>
        {totalActive > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-tertiary text-xs font-medium hover:underline"
          >
            Limpiar ({totalActive})
          </button>
        )}
      </div>
      {groups.map((group) => {
        const isExpanded = expandedGroups.includes(group.label);
        const groupId = `filter-group-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <div key={group.label} className="border-b border-gray-200 pb-4">
            <button
              type="button"
              onClick={() => toggleExpanded(group.label)}
              className="flex w-full cursor-pointer items-center justify-between py-2 text-sm font-semibold text-gray-800"
              aria-expanded={isExpanded}
              aria-controls={groupId}
            >
              <span className="flex items-center gap-2">
                {group.icon && (
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    aria-hidden="true"
                  >
                    {group.icon}
                  </span>
                )}
                {group.label}
              </span>
              <span
                className={cn(
                  "material-symbols-outlined text-sm text-gray-400 transition-transform",
                  isExpanded && "rotate-180"
                )}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
            {isExpanded && (
              <fieldset id={groupId} className="mt-2 space-y-2">
                <legend className="sr-only">
                  Filtrar por {group.label.toLowerCase()}
                </legend>
                {group.options.map((opt) => {
                  const isChecked =
                    selected[group.label]?.includes(opt.value) ?? false;
                  const checkboxId = `filter-${group.label}-${opt.value}`
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  return (
                    <label
                      key={opt.value}
                      htmlFor={checkboxId}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOption(group.label, opt.value)}
                        className="text-primary accent-primary size-4 rounded border-gray-300"
                      />
                      {opt.label}
                      {opt.count != null && (
                        <span className="ml-auto text-xs text-gray-400">
                          ({opt.count})
                        </span>
                      )}
                    </label>
                  );
                })}
              </fieldset>
            )}
          </div>
        );
      })}
    </aside>
  );
}
