import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Cluster {
  id: string;
  name: string;
  isEditing?: boolean;
}

interface ClusterState {
  clusters: Cluster[];
  addCluster: (customId?: string) => void;
  updateCluster: (id: string, newName: string) => void;
  removeCluster: (id: string) => void;
  toggleEdit: (id: string, isEditing: boolean) => void;
}

export const useClusterStore = create<ClusterState>()(
  persist(
    (set) => ({
      clusters: [],
      addCluster: (customId?: string) =>
        set((state) => ({
          clusters: [
            ...state.clusters,
            { id: customId ?? uuidv4(), name: `Cluster-${(customId ?? uuidv4()).slice(0, 6)}` },
          ],
        })),

      updateCluster: (id, newName) =>
        set((state) => ({
          clusters: state.clusters.map((c) => (c.id === id ? { ...c, name: newName } : c)),
        })),
      removeCluster: (id) =>
        set((state) => ({
          clusters: state.clusters.filter((c) => c.id !== id),
        })),
      toggleEdit: (id, isEditing) =>
        set((state) => ({
          clusters: state.clusters.map((c) => (c.id === id ? { ...c, isEditing } : c)),
        })),
    }),
    {
      name: 'clusters-storage',
    },
  ),
);
