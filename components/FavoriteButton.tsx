import React, { useCallback, useMemo } from "react";
import axios from "axios";

import { GoPlus } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FavoriteButtonProps {
    movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    movieId
}) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async() => {
        let response;
        if(isFavorite) {
            response = await axios.delete("/api/favorite", { data: { movieId }});
        } else {
            response = await axios.post("/api/favorite", { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? FaCheck : GoPlus;

    return (
        <div 
            className="
                cursor-pointer
                group/item
                w-6
                h-6
                lg:w-10
                lg:h-10
                border-white
                border-2
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:border-neutral-300
            "
            onClick={toggleFavorites}
        >
            <Icon className="text-white" size={25} />
        </div>
    )
};

export default FavoriteButton;

