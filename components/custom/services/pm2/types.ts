export interface IPM2Service {
  name: string;
  status: string;

  isRestarting: boolean;
  isRollbacking: boolean;
  isStarting: boolean;
  isStopping: boolean;
  isDeploying: boolean;
}

export type IEventResponsePM2ActionResult = {
  action: string;
  agentId: string;
  clusterId: string;
  output: string;
  serviceName: string;
  success: boolean;
  timestamp: string;
};
