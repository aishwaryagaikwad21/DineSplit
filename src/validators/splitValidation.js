import { z } from "zod";

export const dishDetailSchema = z.object({
    menu_id: z.string()
        .trim()
        .min(1, "Menu ID is required"),

    who_ordered: z.array(
        z.string()
            .trim()
            .min(1, "Member name cannot be empty")
    ).min(1, "At least one member must be assigned to a dish")
});

export const splitValidation = z.object({

    restaurant_id: z.string()
        .trim()
        .min(1, "Restaurant ID is required"),

    splitType: z.enum(["equal", "item-wise"]),

    totalMembers: z.number()
        .int("Total members must be an integer")
        .positive("There must be at least one member"),

    memNames: z.array(
        z.string()
            .trim()
            .min(1, "Member name cannot be empty")
    ).min(1, "At least one member is required"),

    dishDetails: z.array(dishDetailSchema)
        .min(1, "At least one dish is required")

}).superRefine((data, ctx) => {

    // totalMembers must match number of names
    if (data.totalMembers !== data.memNames.length) {
        ctx.addIssue({
            code: "custom",
            path: ["totalMembers"],
            message: "totalMembers must match number of members"
        });
    }

    // Every person in who_ordered must actually be a member
    data.dishDetails.forEach((dish, index) => {

        dish.who_ordered.forEach((member) => {

            if (!data.memNames.includes(member)) {
                ctx.addIssue({
                    code: "custom",
                    path: [
                        "dishDetails",
                        index,
                        "who_ordered"
                    ],
                    message: `${member} is not a member of this split`
                });
            }

        });

    });

});