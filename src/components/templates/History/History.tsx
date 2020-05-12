import "./History.scss";

import React, {useEffect, useState} from "react";
import Container from "../../atoms/Container";
import Chrome from "../Chrome/Chrome";
import LogEntry from "../../organism/LogEntry";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";
import {IPostData, IPostList} from "./types";

const History = () => {
    const baseclass = "history";

    const [profileData, setProfileData] = useState({name: "Pet", birthday: new Date()})
    const [postData, setPostData] = useState({posts: [], total_posts: 0} as IPostList)

    useEffect(() => {
        const JWT = localStorage.getItem("jwt");

        const config = {
            headers: {Authorization: `Bearer ${JWT}`}
        };

        axios.get(ENDPOINT.PETS.GET_FIRST, config)
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

        axios.get(ENDPOINT.POSTS.GET_ALL, config)
            .then(result => {
                setPostData({
                    ...result.data,
                })

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, [])

    return (
        <Container className={baseclass}>
            <Chrome>
                <Container className={`${baseclass}__content`}>
                    <h2>{profileData.name}'s History</h2>
                    {postData.posts.length > 0 ?
                        postData.posts.map((post: IPostData) => (
                            <LogEntry
                                id={post.id}
                                mood={post.mood}
                                dateCreated={post.creation_datetime}
                                dateLastModified={post.date_last_modified}
                                petBirthday={profileData.birthday}>
                                {post.content}
                            </LogEntry>
                        )) : "No posts to display"
                    }
                </Container>
            </Chrome>
        </Container>
    );
};

export default History;
