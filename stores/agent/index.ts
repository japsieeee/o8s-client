import { EventMetricsResponse } from '@/hooks/socket/types/event-response.types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  clusterId: string;
  name: string;
  metrics?: EventMetricsResponse;
  editing?: boolean;
}

interface AgentState {
  agents: Agent[];
  addAgent: (clusterId: string, name?: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  setMetrics: (id: string, metrics: EventMetricsResponse) => void;
}

export const useAgentStore = create<AgentState>()(
  persist(
    (set) => ({
      agents: [],

      addAgent: (clusterId, name) =>
        set((state) => ({
          agents: [
            ...state.agents,
            { id: uuidv4(), clusterId, name: name ?? `Agent-${state.agents.length + 1}`, editing: false },
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

      setMetrics: (id, metrics) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, metrics } : a)),
        })),
    }),
    {
      name: 'agents-storage',
    },
  ),
);
