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
            favouriteToy: favouriteToy
                ? favouriteToy.value
                : profileData.favourite_toy,
            favouriteFood: favouriteFood
                ? favouriteFood.value
                : profileData.favourite_food,
            personalityTrait: personalityTrait
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
            window.location.reload()
        }, 500);

        axios.patch(ENDPOINT.PETS.PATCH_FIRST, {
            name: completedPetData.name || "",
            species: completedPetData.species || "",
            breed: completedPetData.breed || "",
            weight: completedPetData.weight || 0,
            height: completedPetData.height || 0,
            favourite_toy: completedPetData.favouriteToy || "",
            favourite_food: completedPetData.favouriteFood || "",
            personality_trait: completedPetData.personalityTrait || "",
            profile_completed: isComplete || false,
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
                        <img
                            onClick={handleFileUploader}
                            // @ts-ignore
                            src={profileData.profile_image}
                            alt={`${petName}`}
                            id="profile-image"
                        />
                        {petProfileImage ===
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
                            <input
                                name="name"
                                type="text"
                                placeholder={`${petName}'s name`}
                                defaultValue={profileData.name}
                                id="form-name"
                            />

                            <input
                                name="species"
                                type="text"
                                placeholder={`${petName}'s species`}
                                defaultValue={profileData.species}
                                id="form-species"
                            />

                            <input
                                name="breed"
                                type="text"
                                placeholder={`${petName}'s breed`}
                                defaultValue={profileData.breed}
                                id="form-breed"
                            />

                            <input
                                name="breed"
                                type="date"
                                defaultValue={birthdayField}
                                id="form-birthday"
                            />

                            <input
                                name="favouriteToy"
                                type="text"
                                placeholder={`${petName}'s favourite toy`}
                                defaultValue={profileData.favourite_toy}
                                id="form-favourite-toy"
                            />

                            <input
                                name="favouriteFood"
                                type="text"
                                placeholder={`${petName}'s favourite food`}
                                defaultValue={profileData.favourite_food}
                                id="form-favourite-food"
                            />

                            <input
                                name="personalityTrait"
                                type="text"
                                placeholder={`${petName}'s personality trait`}
                                defaultValue={profileData.personality_trait}
                                id="form-personality-trait"
                            />

                            <input
                                name="weight"
                                type="text"
                                placeholder={`${petName}'s weight (in kg)`}
                                defaultValue={profileData.weight}
                                id="form-weight"
                            />

                            <input
                                name="height"
                                type="text"
                                placeholder={`${petName}'s height (in cm)`}
                                defaultValue={profileData.height}
                                id="form-height"
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
