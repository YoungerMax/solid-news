export default function Loading() {
    return (
        <div class="bg-gray-200 w-100 h-1 rounded overflow-hidden" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <div class="bg-blue-600 w-25 h-1 rounded loading-animate"></div>
        </div>
    )
}