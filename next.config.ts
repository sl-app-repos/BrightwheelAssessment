import type { NextConfig } from "next";
import os from "os";

/** IPv4 addresses on this machine (Wi‑Fi/Ethernet) for LAN dev access. */
function getLanIpv4Hosts(): string[] {
  const hosts = new Set<string>();
  for (const net of Object.values(os.networkInterfaces())) {
    for (const addr of net ?? []) {
      if (addr.family === "IPv4" && !addr.internal) {
        hosts.add(addr.address);
      }
    }
  }
  return [...hosts];
}

const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  // Allow other devices on the local network to load the dev server (/_next assets).
  // Without this, browsers see a plain "Unauthorized" response for internal dev URLs.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.localhost",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
    ...getLanIpv4Hosts(),
    ...extraDevOrigins,
  ],
};

export default nextConfig;
