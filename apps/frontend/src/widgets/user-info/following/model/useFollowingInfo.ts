import { API_URL } from "@shared/constants/constants";
import { UserToUserSubs } from "@shared/types/user";
import { Artist } from "@shared/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "@app/store/user/useUser";

export const useFollowingInfo = () => {
  const { user } = useUserStore();
  const [userFollowings, setUserFollowings] = useState<
    (UserToUserSubs | (Artist & { added_at: string }))[]
  >([]);
  const [filteredFollowings, setFilteredFollowings] = useState<
    (UserToUserSubs | (Artist & { added_at: string }))[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchFollowing = async () => {
      const response = await fetch(`${API_URL}/get-user-subscriptions/${id}`);
      const data = await response.json();
      setUserFollowings(data);
      setFilteredFollowings(data);
      setLoading(false);
    };
    fetchFollowing();
  }, []);

  const handleSelectFilter = (value: string) => {
    setCurrentFilter(value);
    if (value === "all") {
      setFilteredFollowings(userFollowings);
    } else {
      setFilteredFollowings(userFollowings.filter((sub) => sub.type === value));
    }
  };

  return {
    user,
    filteredFollowings,
    loading,
    currentFilter,
    handleSelectFilter,
  };
};
