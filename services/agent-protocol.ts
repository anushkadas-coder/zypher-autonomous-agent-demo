
/**
 * ZYPHER PROTOCOL LAYER
 * Manages low-level handshake and telemetry between the terminal and the reasoning kernel.
 */
export const PROTOCOL_VERSION = "1.4.2";

export interface ProtocolStatus {
  online: boolean;
  latency: number;
}
