import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";
import { ProductContext } from "./ProductContextValue";

export function ProductProvider({ children }) {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await apiClient.get("/services");
      const services = response.data?.data ?? response.data;

      if (!Array.isArray(services)) {
        throw new Error("Format data layanan dari server tidak valid.");
      }

      return services;
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/categories");
      const categories = response.data?.data ?? response.data;

      if (!Array.isArray(categories)) {
        throw new Error("Format data kategori dari server tidak valid.");
      }

      return categories;
    },
  });

  const invalidateServices = () =>
    queryClient.invalidateQueries({ queryKey: ["services"] });

  const addMutation = useMutation({
    mutationFn: (formData) => apiClient.post("/services", formData),
    onSuccess: invalidateServices,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => apiClient.post(`/services/${id}`, formData),
    onSuccess: invalidateServices,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/services/${id}`),
    onSuccess: invalidateServices,
  });

  const value = {
    services: servicesQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    isLoading: servicesQuery.isLoading,
    servicesError: servicesQuery.error,
    categoriesIsLoading: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    addProduct: (formData) => addMutation.mutateAsync(formData),
    updateProduct: (id, formData) =>
      updateMutation.mutateAsync({ id, formData }),
    deleteProduct: (id) => deleteMutation.mutateAsync(id),
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
