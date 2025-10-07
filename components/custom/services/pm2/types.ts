export interface IPM2Service {
  name: string;
  status: string;

  isRestarting: boolean;
  isStarting: boolean;
  isStopping: boolean;
  isDeploying: boolean;
}
