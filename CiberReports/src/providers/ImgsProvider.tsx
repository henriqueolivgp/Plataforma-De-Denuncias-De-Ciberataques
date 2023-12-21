import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import ChildrenContext, { ImgsContext } from "../context/ImgsContext";
import { useState, useCallback } from "react";
import type { ImgType } from '../context/ImgsContext';
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';

export function ImgsProvider({ children }: ChildrenContext) {
    const { user } = useAuth();
    const [bannerImage, setBannerImage] = useState<ImgType[]>([]);
    const [avatarImage, setAvatarImage] = useState<ImgType[]>([]);

    const getBanner = useCallback(async (): Promise<{ bannerImage: ImgType[]; } | undefined> => {
        try {
            const { data, error } = await SupaBaseClient
                .storage
                .from('Banner')
                .list(`${user?.id}/`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "name", order: "asc" }
                });

            if (data) {
                setBannerImage(data);

                return { bannerImage: data }; // Return the data as expected
            } else {
                console.log("Error loading Banner");
                console.log(error);
                return undefined; // Return undefined in case of an error
            }

        } catch (error) {
            console.error("Error fetching banner:", error);
            return undefined; // Return undefined in case of an error
        }
    }, [user]);

    const getAvatar = useCallback(async (): Promise<{ avatarImage: ImgType[]; } | undefined> => {
        try {
            const { data, error } = await SupaBaseClient
                .storage
                .from('Avatar')
                .list(`${user?.id}/`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "name", order: "asc" }
                });

            if (data) {
                setAvatarImage(data);

                return { avatarImage: data }; // Return the data as expected
            } else {
                console.log("Error loading Banner");
                console.log(error);
                return undefined; // Return undefined in case of an error
            }

        } catch (error) {
            console.error("Error fetching banner:", error);
            return undefined; // Return undefined in case of an error
        }
    }, [user]);

    const uploadBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) {
                toast.error('No file selected.');
                return;
            }

            const { data, error } = await SupaBaseClient
                .storage
                .from('Banner')
                .upload(`${user?.id}/${uuidv4()}`, file);

            if (data) {
                getBanner();
            } else {
                console.error(error);
            }
        } catch (error) {
            toast.error('An error occurred during image upload');
        }
    };

    const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) {
                toast.error('No file selected.');
                return;
            }

            const { data, error } = await SupaBaseClient
                .storage
                .from('Avatar')
                .upload(`${user?.id}/${uuidv4()}`, file);

            if (data) {
                getAvatar();
            } else {
                console.error(error);
            }
        } catch (error) {
            toast.error('An error occurred during image upload');
        }
    };

    const updateBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) {
                toast.error('No file selected.');
                return;
            }
            if (bannerImage.length <= 0) {

                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Banner')
                    .upload(`${user?.id}/${uuidv4()}`, file);

                if (data) {
                    getAvatar();
                } else {
                    console.error(error);
                }
                console.log(data)

            } else {
                await SupaBaseClient
                    .storage
                    .from('Banner')
                    .remove([`${user?.id}/${bannerImage[0].name}`])

                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Banner')
                    .upload(`${user?.id}/${uuidv4()}`, file);

                if (data) {
                    getAvatar();
                } else {
                    console.error(error);
                }
                console.log(data)
            }
        } catch (error) {
            toast.error('An error occurred during image upload');
        }
    };

    const updateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) {
                toast.error('No file selected.');
                return;
            }

            if (avatarImage.length <= 0) {

                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Avatar')
                    .upload(`${user?.id}/${uuidv4()}`, file);

                if (data) {
                    getAvatar();
                } else {
                    console.error(error);
                }
                console.log(data)

            } else {
                await SupaBaseClient
                    .storage
                    .from('Avatar')
                    .remove([`${user?.id}/${avatarImage[0].name}`])

                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Avatar')
                    .upload(`${user?.id}/${uuidv4()}`, file);

                if (data) {
                    getAvatar();
                } else {
                    console.error(error);
                }
                console.log(data)
            }

        } catch (error) {
            toast.error('An error occurred during image upload');
        }
    };

    return (
        <ImgsContext.Provider value={{ user, bannerImage, avatarImage, getBanner, getAvatar, uploadBanner, uploadAvatar, updateAvatar, updateBanner }}>
            {children}
        </ImgsContext.Provider>
    );
}
