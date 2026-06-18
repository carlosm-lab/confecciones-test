"use client";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import Image from "next/image";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("get_users_list");

      if (error) throw error;
      setUsers(
        ((data as UserProfile[]) || []).map((u) => ({
          id: u.id,
          email: u.email || "Sin email",
          full_name: u.full_name || "",
          avatar_url: u.avatar_url || null,
          role: u.role || "user",
          created_at: u.created_at,
        }))
      );
    } catch (error) {
      logger.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter by search and role
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !searchTerm ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  /** Generate initials from name or email */
  const getInitials = (name: string, email: string): string => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    const localPart = email.split("@")[0] || "";
    const emailParts = localPart.split(/[._-]/);
    if (emailParts.length >= 2) {
      return (emailParts[0][0] + emailParts[1][0]).toUpperCase();
    }
    return localPart.slice(0, 2).toUpperCase();
  };

  /** Color palette for avatar backgrounds based on role */
  const getAvatarStyles = (role: string) => {
    if (role === "admin") {
      return "bg-primary/15 text-primary dark:bg-primary/25";
    }
    return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
  };

  return (
    <div className="flex h-full w-full max-w-[1400px] flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mb-1 flex items-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
            Usuarios
            {users.length > 0 && (
              <span className="bg-primary rounded-full px-2.5 py-0.5 text-xs font-bold text-white">
                {users.length}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 md:text-base dark:text-slate-400">
            Usuarios registrados en Confecciones Liss.
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid grid-cols-3 gap-3 md:gap-4">
        <div className="border-primary/30 dark:border-primary/20 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary dark:bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <span className="material-symbols-outlined text-[20px]">
                group
              </span>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 md:text-2xl dark:text-white">
                {isLoading ? "..." : users.length}
              </p>
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                Total
              </p>
            </div>
          </div>
        </div>
        <div className="border-primary/30 dark:border-primary/20 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
              <span className="material-symbols-outlined text-[20px]">
                shield_person
              </span>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 md:text-2xl dark:text-white">
                {isLoading ? "..." : adminCount}
              </p>
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                Admins
              </p>
            </div>
          </div>
        </div>
        <div className="border-primary/30 dark:border-primary/20 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 md:text-2xl dark:text-white">
                {isLoading ? "..." : userCount}
              </p>
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                Usuarios
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-primary/30 dark:border-primary/20 mb-6 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] sm:flex-row sm:items-center dark:bg-white/5">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center leading-[0] text-slate-400">
            <span className="material-symbols-outlined text-[20px] leading-[0]">
              search
            </span>
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Role Tabs */}
        <div className="flex w-full self-start rounded-xl bg-slate-100 p-1 sm:w-auto sm:self-auto dark:bg-white/5">
          {(["all", "admin", "user"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setRoleFilter(f)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium whitespace-nowrap transition-all sm:px-4 ${roleFilter === f ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              {f === "all" ? "Todos" : f === "admin" ? "Admins" : "Usuarios"}
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="border-primary/30 dark:border-primary/20 flex-1 overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <div className="custom-scrollbar h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="border-primary/20 border-t-primary mb-4 h-10 w-10 animate-spin rounded-full border-4" />
              <p className="text-slate-500">Cargando usuarios...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-transparent">
                <span className="material-symbols-outlined text-[32px]">
                  person_off
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                Sin resultados
              </h3>
              <p className="text-slate-500">
                {searchTerm
                  ? `No se encontraron usuarios con "${searchTerm}".`
                  : roleFilter !== "all"
                    ? `No hay usuarios con rol "${roleFilter}".`
                    : "No hay usuarios registrados aún."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {/* Table Header — hidden on mobile */}
              <div className="hidden border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-xs font-bold tracking-wider text-slate-500 uppercase sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-4 md:grid-cols-[1fr_120px_160px] dark:border-white/5 dark:bg-white/5">
                <span>Usuario</span>
                <span className="text-center">Rol</span>
                <span className="text-right">Registrado</span>
              </div>

              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-slate-50 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4 md:grid-cols-[1fr_120px_160px] dark:hover:bg-white/5"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold ${getAvatarStyles(user.role)}`}
                    >
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.full_name || user.email}
                          width={40}
                          height={40}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(user.full_name, user.email)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {user.full_name || "Sin Nombre"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="flex items-center sm:justify-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        user.role === "admin"
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {user.role === "admin" ? "shield_person" : "person"}
                      </span>
                      {user.role === "admin" ? "Admin" : "Usuario"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-slate-500 sm:text-right">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer count */}
      {!isLoading && filteredUsers.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-500">
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </div>
      )}
    </div>
  );
}
