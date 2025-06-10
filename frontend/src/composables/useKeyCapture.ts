import { ref, onMounted, onUnmounted } from 'vue'
import { useButtonBindStore } from '@/stores/buttonBindStore'

export const useKeyCapture = () => {
    const store = useButtonBindStore()
    const capturing = ref<boolean>(false)
    const currentKeys = ref<Set<string>>(new Set())
    const capturingButton = ref<number | null>(null)


    const startCapturing = (buttonId: number) => {
        capturing.value = true
        currentKeys.value = new Set()
        capturingButton.value = buttonId

        console.log("Started capturing button press");
    }

    const stopCapturing = () => {
        capturing.value = false
        capturingButton.value = null
        currentKeys.value = new Set()

        console.log('Stopped capturing')
    }

    const stopCapturingClickOut = () => {
        if (!capturing.value || capturingButton.value === null) return

        store.updateButton(capturingButton.value, {state: 'notBinded'})

        stopCapturing()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!capturing.value || capturingButton === null) return

        //dont want other effects when pressing the buttons
        event.preventDefault()
        event.stopPropagation()

        currentKeys.value.add(event.code)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if (!capturing.value || capturingButton.value === null) return

        event.preventDefault()
        event.stopPropagation()

        const keyCombination = Array.from(currentKeys.value)
        const keyDisplay = keyCombination.join(" + ")
        console.log("Key combination captured");
        
        store.updateButton(capturingButton.value, {
            state: 'binded',
            text: keyDisplay,
            value: keyCombination
        })

        //stop capturing
        stopCapturing()
    }

    //setup event listeners when the composable is mounted
    onMounted(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        document.addEventListener('click', stopCapturingClickOut)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
    })

    return {
        capturing,
        capturingButton,
        startCapturing,
        stopCapturing
    }

}