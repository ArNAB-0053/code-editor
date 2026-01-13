import { JAVASCRIPT_LOGO, PYTHON_LOGO } from "@/assets/p_logo/logoAssets"

export const getProgLangLogos = (lang: string) => {
    switch(lang) {
        case 'python':
            return PYTHON_LOGO
        
        case 'javascript':
            return JAVASCRIPT_LOGO
        
        default:
            return PYTHON_LOGO
    }
} 