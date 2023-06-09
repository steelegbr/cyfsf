import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "next-share";

interface SocialProps {
    result: string,
    guess: any,
    url: string
}

const Social = ({ result, guess, url }: SocialProps) => {
    const socialText = result === "Success" ? "I managed to find Sherwood Forest constituency. Can you?" : `I got within ${guess.distance} mile(s) of Sherwood Forest consistuency. Can you find it?`;

    return (
        <div className="flex space-x-4">
            <span>Share your result:</span>
            <FacebookShareButton url={url} quote={socialText}>
                <FacebookIcon size={32} />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={socialText}>
                <TwitterIcon size={32} />
            </TwitterShareButton>
        </div>
    )
}

export default Social;