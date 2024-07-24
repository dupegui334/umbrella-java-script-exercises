import { IPv4 } from "../lib/ipv4";

test("network Address is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.networkAddress()).toBe("192.168.96.0");
});

test("first address is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.firstUsableAddress()).toBe("192.168.96.1");
});

test("first address (AWS) is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.firstUsableAddress(3)).toBe("192.168.96.4");
});

test("last usable address is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.lastUsableAddress()).toBe("192.168.111.254");
});

test("broadcast address is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.broadcastAddress()).toBe("192.168.111.255");
});

test("netmask is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.netmask()).toBe("255.255.240.0");
});

test("count of address in CIDR range is correct", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.count()).toBe(4096);
});

test("usable avaiable address count is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.availableCount()).toBe(4094);
});

test("usable avaiable address count (AWS) is calculated correctly", () => {
  // using 192.168.100.14/20 CIDR
  const ipv4 = new IPv4([192, 168, 100, 14], 20);
  expect(ipv4.availableCount(5)).toBe(4091);
});
