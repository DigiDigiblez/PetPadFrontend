import "./History.scss";

import React, {useEffect, useState} from "react";
import Container from "../../atoms/Container";
import Chrome from "../Chrome/Chrome";
import LogEntry from "../../organism/LogEntry";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const History = () => {
    const baseclass = "history";

    interface IPostData {
        mood: string;
        content: string;
        creation_datetime: Date;
        date_last_modified: Date;
        is_open: boolean;
    }

    interface IPostList {
        posts: IPostData[];
        total_posts: number;
    }

    const [profileData, setProfileData] = useState({name: "Pet", birthday: new Date()})
    const [postData, setPostData] = useState({posts: [], total_posts: 0} as IPostList)

    useEffect(() => {
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

        axios.get(ENDPOINT.POSTS.GET_ALL)
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
