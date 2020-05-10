import "./Profile.scss";

import React, {useEffect, useState} from "react";

import * as PlaceholderProfileImage from "../../../res/profile_image.png";

import Container from "../../atoms/Container";
import Chrome from "../Chrome/Chrome";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const Profile = () => {
    const baseclass = "profile";

    const [profileData, setProfileData] = useState({
        name: undefined,
        gender: undefined,
        species: undefined,
        breed: undefined,
        weight: undefined,
        height: undefined,
        birthday: undefined,
        favourite_toy: undefined,
        favourite_food: undefined,
        personality_trait: undefined,
        social_google_plus_url: undefined,
        social_facebook_url: undefined,
        social_twitter_url: undefined,
        social_instragram_url: undefined,
        profile_image: undefined,
        profile_completed: undefined,
    })

    // Capture new upload profile images
    const [petProfileImage, setPetProfileImage] = useState(
        profileData.profile_image,
    );

    const [birthdayField, setBirthdayField] = useState("")


    useEffect(() => {
        axios.get(ENDPOINT.PETS.GET_FIRST)
            .then(result => {
                setProfileData({
                    ...profileData,
                    ...result.data,
                })

                const oldDateFormat = new Date(result.data.birthday);
                const birthdayDate = oldDateFormat.toISOString().split("T")[0];
                const formattedBirthdayDate = birthdayDate.replace("/", "-");
                setBirthdayField(formattedBirthdayDate)

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const {
            name,
            species,
            breed,
            favouriteToy,
            favouriteFood,
            personalityTrait,
            weight,
            height,
        } = e.target;

        const completedPetData = {
            name: name ? name.value : profileData.name,
            species: species ? species.value : profileData.species,
            breed: breed ? breed.value : profileData.breed,
            favourite_toy: favouriteToy
                ? favouriteToy.value
                : profileData.favourite_toy,
            favourite_food: favouriteFood
                ? favouriteFood.value
                : profileData.favourite_food,
            personality_trait: personalityTrait
                ? personalityTrait.value
                : profileData.personality_trait,
            weight: weight ? weight.value : profileData.weight,
            height: height ? height.value : profileData.height,
        };

        // Check if the profile is complete
        const isComplete: boolean = Object.values(
            completedPetData,
        ).every(property => property);

        const well = document.querySelector(".save-successful-well")!;
        const submitBtn = document.getElementById(
            "save-profile-data-btn",
        )! as HTMLInputElement;

        well.classList.toggle("hidden");
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";

        setTimeout(() => {
            well.classList.toggle("hidden");
            submitBtn.disabled = false;
            submitBtn.style.cursor = "pointer";
            // window.location.reload()
        }, 500);

        console.log(e.target)

        axios.patch(ENDPOINT.PETS.PATCH_FIRST, {
            name: completedPetData.name || "",
            species: completedPetData.species || "",
            breed: completedPetData.breed || "",
            weight: completedPetData.weight || 0,
            height: completedPetData.height || 0,
            favourite_toy: completedPetData.favourite_toy || "",
            favourite_food: completedPetData.favourite_food || "",
            personality_trait: completedPetData.personality_trait || "",
            profile_completed: isComplete || false,
        })
            .then(result => {
                axios.get(ENDPOINT.PETS.GET_FIRST)
                    .then(result => {
                        setProfileData({
                            ...profileData,
                            ...result.data,
                        })

                        window.scrollTo(0, 0);

                        console.log("Success: ", result);
                    })
                    .catch(error => {
                        window.scrollTo(0, 0);

                        console.log("Error: ", error);
                    });

                console.log("Success: ", result);
            })
            .catch(error => {
                window.scrollTo(0, 0);

                console.log("Error: ", error);
            });
    };

    let pronoun;
    if (profileData.gender === "male") pronoun = "his";
    else if (profileData.gender === "female") pronoun = "her";

    const petName = profileData.name || "Pet";

    // Click the file uploader input when the profile image container is clicked
    const handleFileUploader = () => {
        document.getElementById("upload-image")!.click();
    };

    const encodeImageFileAsURL = (files: any): void => {
        if (files && files[0]) {
            // Prevent user uploading non-images, or images exceeding 2MB
            const fileSizeInMegabytes = files[0].size / 1024 / 1024;
            const fileIsAnImage = files[0].type.includes("image");

            if (fileSizeInMegabytes >= 2) {
                return alert("File size exceeds 2 MB")
            }

            if (!fileIsAnImage) {
                return alert("Only image file types are supported.")
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                axios.patch(ENDPOINT.PETS.PATCH_FIRST, {
                    profile_image: reader.result || "",
                })
                    .then(result => {
                        axios.get(ENDPOINT.PETS.GET_FIRST)
                            .then(result => {
                                setProfileData({
                                    ...profileData,
                                    ...result.data,
                                })

                                console.log("Success: ", result);
                            })
                            .catch(error => {
                                console.log("Error: ", error);
                            });

                        console.log("Success: ", result);
                    })
                    .catch(error => {
                        console.log("Error: ", error);
                    });
            };

            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <Container className={baseclass}>
            <Chrome>
                <Container className={`${baseclass}__content`}>
                    <h2>{petName || "Pet"}'s Profile</h2>
                    <Container className={`${baseclass}__pet_avatar`}>
                        {profileData.profile_image && <img
                            onClick={handleFileUploader}
                            // @ts-ignore
                            src={profileData.profile_image}
                            alt={`${petName}`}
                            id="profile-image"
                        />}
                        {profileData.profile_image ===
                        PlaceholderProfileImage && (
                            <span className="change-image">
                                Upload image
                            </span>
                        )}
                    </Container>
                    {/* Gets invokes when the profile image is clicked */}
                    <input
                        type="file"
                        onChange={e =>
                            encodeImageFileAsURL(e.target.files)
                        }
                        id="upload-image"
                        multiple={false}
                        capture
                    />

                    <Container className={`${baseclass}__pet_data`}>
                        <span
                            className={`${baseclass}__pet_data_title`}>
                            {profileData.profile_completed ? (
                                <h4>
                                    {petName
                                        ? `${petName}'s`
                                        : pronoun}{" "}
                                    profile complete
                                </h4>
                            ) : (
                                <h4>
                                    Complete{" "}
                                    {petName
                                        ? `${petName}'s`
                                        : pronoun}{" "}
                                    profile
                                </h4>
                            )}
                        </span>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                <small>Name</small>
                            </label>
                            <input
                                name="name"
                                type="text"
                                pattern="[A-Za-z ]*"
                                placeholder={`${petName}'s name`}
                                defaultValue={profileData.name}
                                id="form-name"
                                required
                            />

                            <label htmlFor="species">
                                <small>Species</small>
                            </label>
                            <select name="species" id="form-species" required>
                                <option disabled>
                                    {petName}'s species
                                </option>
                                <option value="Dog" selected>Dog</option>
                            </select>

                            <label htmlFor="breed">
                                <small>Species</small>
                            </label>
                            <select name="breed" id="form-breed" required>
                                <option disabled>
                                    {petName}'s breed
                                </option>
                                <option value="Border Collie" selected>Border Collie</option>
                            </select>

                            <label htmlFor="birthday">
                                <small>Birthday</small>
                            </label>
                            <input
                                name="birthday"
                                type="text"
                                defaultValue={birthdayField}
                                id="form-birthday"
                                required
                            />

                            <label htmlFor="favouriteToy">
                                <small>Favourite toy</small>
                            </label>
                            <input
                                name="favouriteToy"
                                type="text"
                                pattern="[A-Za-z ]*"
                                placeholder={`${petName}'s favourite toy`}
                                defaultValue={profileData.favourite_toy}
                                id="form-favourite-toy"
                                required
                            />

                            <label htmlFor="favouriteFood">
                                <small>Favourite food</small>
                            </label>
                            <input
                                name="favouriteFood"
                                type="text"
                                pattern="[A-Za-z ]*"
                                placeholder={`${petName}'s favourite food`}
                                defaultValue={profileData.favourite_food}
                                id="form-favourite-food"
                                required
                            />

                            <label htmlFor="personalityTrait">
                                <small>Personality trait</small>
                            </label>
                            <select name="personalityTrait" id="form-gender" required>
                                <option disabled>
                                    {petName}'s personality trait
                                </option>
                                <option value="Playful" selected>Playful</option>
                            </select>


                            <label htmlFor="weight">
                                <small>Weight (in kg)</small>
                            </label>
                            <input
                                name="weight"
                                type="text"
                                pattern="[1-9.]*"
                                placeholder={`${petName}'s weight (in kg)`}
                                defaultValue={profileData.weight}
                                id="form-weight"
                                required
                            />

                            <label htmlFor="height">
                                <small>Height (in cm)</small>
                            </label>
                            <input
                                name="height"
                                type="text"
                                pattern="[1-9.]*"
                                placeholder={`${petName}'s weight (in cm)`}
                                defaultValue={profileData.height}
                                id="form-height"
                                required
                            />

                            <button
                                type="submit"
                                className="secondary_cta"
                                id="save-profile-data-btn">
                                Update profile
                            </button>

                            <div
                                className={`well save-successful-well hidden`}>
                                Profile saved!
                            </div>
                        </form>
                    </Container>

                    {/*<Container className={`${baseclass}__pet_social`}>*/}
                    {/*    <span*/}
                    {/*        className={`${baseclass}__pet_data_title`}>*/}
                    {/*        <h4>*/}
                    {/*            Link {pronoun ? pronoun : `${name}'s`}{" "}*/}
                    {/*            social media*/}
                    {/*        </h4>*/}
                    {/*    </span>*/}
                    {/*    Buttons TBA...*/}
                    {/*</Container>*/}
                </Container>
            </Chrome>
        </Container>
    );
};

export default Profile;
