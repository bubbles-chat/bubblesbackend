export const getResourceType = (type: string) => {
    let resourceType

    if (type.includes('image')) {
        resourceType = 'image'
    } else if (type.includes('video')) {
        resourceType = 'video'
    } else if (type.includes('application') || type.includes('audio')) {
        resourceType = 'raw'
    } else throw new Error("getResourceType: File format not supported")

    return resourceType
}