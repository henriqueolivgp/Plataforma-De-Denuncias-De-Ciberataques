import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import ChildrenContext, { ImgsContext } from "../context/ImgsContext";
import { useState, useCallback } from "react";
import type { ImgType } from '../context/ImgsContext';
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";



export function ImgsProvider({ children }: ChildrenContext) {
    const { user } = useAuth();
    const [bannerImages, setBannerImages] = useState<ImgType[]>([]);
    const [avatarImages, setAvatarImages] = useState<ImgType[]>([]);
    const [images, setImages] = useState<ImgType[]>([]);

    const getImages = useCallback(async () => {
        console.log("estou aqui")
        try {
            const { data, error } = await SupaBaseClient
                .storage
                .from('Imgs')
                .list(`${user?.id}/`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "name", order: "asc" }
                });

            if (data) {
                const bannerImages = data.filter(image => image.name.startsWith("banner"));
                const avatarImages = data.filter(image => image.name.startsWith("avatar"));

                setImages(data);
                console.log("estou no provider no getImages")
                setBannerImages(bannerImages);
                setAvatarImages(avatarImages);

                // Retornar as imagens aqui
                return { bannerImages, avatarImages, images: data };
            } else {
                toast.error("Error loading images");
                console.log(error);
                
            }
        } catch (error) {
            console.error(error);
        }
    }, [user]);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Função uploadImage chamada");
        const file = e.target.files?.[0];

        if (file && user) {
            try {
                const fileBanner = images.length === 0 ? "banner" : "banner";
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Imgs')
                    .upload(`${user.id}/${fileBanner}`, file);

                if (data) {
                    getImages();

                    if (images.length === 0) {
                        console.log('Imagem enviada como banner.');
                    }
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }

            try {
                const fileAvatar = images.length === 0 ? "avatar" : "avatar";
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Imgs')
                    .upload(`${user.id}/${fileAvatar}`, file);

                if (data) {
                    getImages();

                    if (images.length === 0) {
                        console.log('Imagem enviada como avatar.');
                    }
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <ImgsContext.Provider value={{ user, bannerImages, avatarImages, images, getImages, uploadImage, }}>
            {children}
        </ImgsContext.Provider>
    );
}
