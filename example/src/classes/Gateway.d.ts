export declare class _GatewayClient {
    client_types: string[];
    client_type: string;
    cluster_code: string;
    is_connected: boolean;
    constructor();
    get_client_type(): string;
    get_cluster_code(): string;
    get_connection_state(): boolean;
    connect(client_type?: string, cluster_code?: string): void;
    private display_connecting();
    private controller_connecting(cluster_code?);
    private gen_cluster_code();
}
export declare var GatewayClient: _GatewayClient;
