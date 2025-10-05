import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  clusterId: string;
  name: string;
  metricsHistory: EventMetricsResponse[]; // changed from single metric to array
  editing?: boolean;
}

interface AgentState {
  agents: Agent[];

  addAgent: (clusterId: string, name?: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;

  /** Append a new metric entry to the agent’s history */
  addMetrics: (id: string, metric: EventMetricsResponse) => void;

  /** Replace the full history manually (optional) */
  setMetrics: (id: string, metrics: EventMetricsResponse[]) => void;

  /** Optional helper to clear old metrics */
  clearMetrics: (id: string) => void;
}

export const useAgentStore = create<AgentState>()(
  persist(
    (set) => ({
      agents: [],
      metricsHistory: [],

      addAgent: (clusterId, name) =>
        set((state) => ({
          agents: [
            ...state.agents,
            {
              id: uuidv4(),
              clusterId,
              name: name ?? `Agent-${state.agents.length + 1}`,
              editing: false,
              metricsHistory: [],
            },
          ],
        })),

      updateAgent: (id, updates) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),

      removeAgent: (id) =>
        set((state) => ({
          agents: state.agents.filter((a) => a.id !== id),
        })),

      addMetrics: (id, metric) =>
        set((state) => ({
          agents: state.agents.map((a) =>
            a.id === id
              ? {
                  ...a,
                  metricsHistory: [...(a.metricsHistory ?? []).slice(-49), metric],
                }
              : a,
          ),
        })),

      setMetrics: (id, metrics) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, metricsHistory: metrics } : a)),
        })),

      clearMetrics: (id) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, metricsHistory: [] } : a)),
        })),
    }),
    {
      name: 'agents-storage',
    },
  ),
);
