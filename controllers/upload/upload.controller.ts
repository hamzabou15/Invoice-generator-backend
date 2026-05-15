import { Request, Response }
    from "express";
import { deleteImage, uploadImage } from "../../services/upload/cloudinary.service";


export async function upload(
    req: Request,
    res: Response
) {

    try {

        const { file } = req.body;

        const result =
            await uploadImage(file);

        return res.json(result);

    } catch (error) {

        return res.status(500).json({

            message:
                "Erreur upload image",
        });
    }
}

export async function remove(
    req: Request,
    res: Response
) {

    try {

        const { publicId } =
            req.body;

        await deleteImage(publicId);

        return res.json({

            success: true,
        });

    } catch {

        return res.status(500).json({

            message:
                "Erreur suppression image",
        });
    }
}