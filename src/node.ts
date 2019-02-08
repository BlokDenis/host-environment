import { Host, NodeInfo, OSInfo } from "./host";
import { toJSON } from "./to-json";

/**
 * Information about the host environment that the code is running in.
 */
export const host: Host = {
  global,
  os: getOSInfo(),
  node: getNodeInfo(),
  browser: false,
  env: process.env,
  toJSON,
};

/**
 * Returns information about the current Node.js host.
 */
function getNodeInfo(): NodeInfo {
  let versionParts = /(\d+)\.(\d+)(?:\.(\d+))?/.exec(process.version)!;
  let major = parseInt(versionParts[1], 10) || 0;
  let minor = parseInt(versionParts[2], 10) || 0;
  let patch = parseInt(versionParts[3], 10) || 0;

  return {
    version: parseFloat(`${major}.${minor}`),
    majorVersion: major,
    minorVersion: minor,
    patchVersion: patch,
    [`v${major}`]: true,
  };
}

/**
 * Returns information about the current operating system.
 */
function getOSInfo(): OSInfo {
  let windows = process.platform.startsWith("win");
  let mac = process.platform === "darwin";
  let linux = !windows && !mac;
  return { windows, mac, linux };
}