import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://10.10.7.76:14010",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAdminProfile = () => {
  const getAdmin = async () => {
    const response = await API.get("/api/auth/profile/");
    return response.data;
  };

  const {
    data: admin = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });

  return { admin, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const useTemplates = () => {
  const getTempletes = async () => {
    const response = await API.get("/api/services/script-templates/");
    return response.data;
  };

  const {
    data: templatesData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["templatesData"],
    queryFn: getTempletes,
  });

  return { templatesData, isLoading, isError, error, refetch };
};

export const usePackeges = () => {
  const getData = async () => {
    const response = await API.get("/api/services/packages/");
    return response.data;
  };

  const {
    data: packageData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["packageData"],
    queryFn: getData,
  });

  return { packageData, isLoading, isError, error, refetch };
};

export const useResearchSheets = () => {
  const getData = async () => {
    const response = await API.get("/api/services/research-sheets/");
    return response.data;
  };

  const {
    data: researchSheets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["researchSheets"],
    queryFn: getData,
  });

  return { researchSheets, isLoading, isError, error, refetch };
};

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users.json");
  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};

// Flagged Content List
export const getMockFlaggedContent = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/flagged_content_gendered.json");
  const flaggedContent = res.data || [];

  // Fake pagination
  const totalFlaggedContent = flaggedContent.length;
  const totalPages = Math.ceil(totalFlaggedContent / limit);
  const paginatedData = flaggedContent.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalFlaggedContent,
      page,
      limit,
      totalPages,
    },
  };
};

// Payouts List
export const getMockPayouts = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/payouts_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalPayOuts = resData.length;
  const totalPages = Math.ceil(totalPayOuts / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalPayOuts,
      page,
      limit,
      totalPages,
    },
  };
};

// Tasks List
export const getMockTasks = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/tasks_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalTasks = resData.length;
  const totalPages = Math.ceil(totalTasks / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalTasks,
      page,
      limit,
      totalPages,
    },
  };
};

// leaderboard List
export const getMockLeaderboard = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/leaderboard_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalLeaderboard = resData.length;
  const totalPages = Math.ceil(totalLeaderboard / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalLeaderboard,
      page,
      limit,
      totalPages,
    },
  };
};

// pricing
export const getMockPricing = async () => {
  const response = await axios.get("/pricing.json");

  return response.data;
};

// terms and conditions
export const getMockTermsConditions = async () => {
  const response = await axios.get("/terms_condition.json");

  return response.data;
};

// privacy policy
export const getMockPrivacyPolicy = async () => {
  const response = await axios.get("/privacy_policy.json");

  return response.data;
};
