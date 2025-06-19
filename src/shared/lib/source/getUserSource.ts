export function getUserSource(id: string): "supabase" | "spotify" {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(id) ? "supabase" : "spotify";
}
