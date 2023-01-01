import { Button, Group, Modal, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useState } from "react";
import { useMutation } from "react-query";


export function UploadVideo() {
    const [opend, setOpend] = useState(false)

   

    const upload = (files: File[]) => {
        const formData = new FormData()
        formData.append('video', files[0])
    }

    return (
        <>
            <Modal
                closeOnClickOutside={false}
                onClose={() => setOpend(false)}
                opened={opend}
                title="Upload Video"
                size='xl'>
                <Dropzone
                    onDrop={(files) => {
                    }}
                    accept={[MIME_TYPES.mp4]}
                    multiple={false}>
                    <Group
                        position="center"
                        spacing="xl"
                        style={{
                            minHeight: "50vh",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}>
                        <ArrowBigUpLine />
                        <Text>Drag video here or click to find</Text>
                    </Group>

                </Dropzone>
            </Modal>

            <Button onClick={() => setOpend(true)}>Upload Video</Button>
        </>

    )
}