export interface UsesItem {
  name: string;
  link: string;
  meta?: string;
  config?: {
    title: string;
    language: string;
    code: string;
  };
}

export interface UsesCategory {
  id: string;
  title: string;
  description: string;
  items: UsesItem[];
}

export const USES_DATA: UsesCategory[] = [
  {
    id: "hardware",
    title: "The Driver",
    description: "Hardware & Operating Systems that power my daily workflow.",
    items: [
      {
        name: 'Lenovo IdeaPad Pro 5i 14"',
        link: "https://www.amazon.in/Lenovo-IdeaPad-35-56cm-2-8K-OLED-83D2001GIN/dp/B0CY2LDT1S",
        meta: "Core Ultra 9 / 32GB / 2.8K OLED"
      },
      {
        name: "Ubuntu 25.10",
        link: "https://ubuntu.com/download",
        meta: "Main Production OS"
      },
      {
        name: "Kali GNU/Linux",
        link: "https://www.kali.org/get-kali/",
        meta: "Security Research"
      },
      {
        name: "Windows 11 Pro",
        link: "https://www.microsoft.com/en-us/windows/get-windows-11",
        meta: "Secondary / Gaming"
      }
    ]
  },
  {
    id: "interface",
    title: "The Interface",
    description:
      "Where I spend 90% of my time—shells, editors, and terminal setups.",
    items: [
      {
        name: "Kitty Terminal",
        link: "https://sw.kovidgoyal.net/kitty/",
        meta: "Performance Focused",
        config: {
          title: "kitty.conf",
          language: "text",
          code: `kitty 0.44.0 created by Kovid Goyal
Linux kali 6.17.10+kali-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.17.10-1kali1 (2025-12-08) x86_64
Kali GNU/Linux Rolling kali /dev/tty
Running under: X11
OpenGL: '4.6 (Core Profile) Mesa 25.2.6-1' Detected version: 4.6
Frozen: False
Fonts:
  medium: DejaVuSansMono: /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf:0
          Features: ()
    bold: DejaVuSansMono-Bold: /usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf:0
          Features: ()
  italic: DejaVuSansMono-Oblique: /usr/share/fonts/truetype/dejavu/DejaVuSansMono-Oblique.ttf:0
          Features: ()
      bi: DejaVuSansMono-BoldOblique: /usr/share/fonts/truetype/dejavu/DejaVuSansMono-BoldOblique.ttf:0
          Features: ()
Paths:
  kitty: /usr/bin/kitty
  base dir: /usr/lib/kitty
  extensions dir: /usr/lib/kitty/kitty
  system shell: /usr/bin/zsh
System color scheme: dark. Applied color theme type: none
Loaded config files:
  /home/mka/.config/kitty/kitty.conf

Config options different from defaults:
active_tab_font_style      (True, False)
background_opacity         0.96
cursor_blink_interval      (0.6, kitty.options.utils.EasingFunction(), kitty.options.utils.EasingFunction())
cursor_stop_blinking_after 0
enable_audio_bell          False
focus_follows_mouse        True
font_family                JetBrainsMono Nerd Font
font_size                  19.0
input_delay                2
repaint_delay              5
scrollback_lines           10000
tab_bar_style              powerline
window_padding_width       FloatEdges(left=8.0, top=8.0, right=8.0, bottom=8.0)
Added shortcuts:
  ctrl+f →  search
  ctrl+t →  new_tab
  ctrl+v →  paste_from_clipboard
Changed shortcuts:
  kitty_mod+h →  launch --location=hsplit --cwd=current
  kitty_mod+v →  launch --location=vsplit --cwd=current
Colors:
  background                 #1e1e2e   
  color0                     #45475a   
  color1                     #f38ba8   
  color10                    #a6e3a1   
  color11                    #f9e2af   
  color12                    #89b4fa   
  color13                    #f5c2e7   
  color14                    #94e2d5   
  color15                    #a6adc8   
  color2                     #a6e3a1   
  color3                     #f9e2af   
  color4                     #89b4fa   
  color5                     #f5c2e7   
  color6                     #94e2d5   
  color7                     #bac2de   
  color8                     #585b70   
  color9                     #f38ba8   
  cursor                     #f5e0dc   
  cursor_text_color          #1e1e2e   
  foreground                 #cdd6f4   
  selection_background       #f5e0dc   
  selection_foreground       #1e1e2e`
        }
      },
      {
        name: "VS Code",
        link: "https://code.visualstudio.com/",
        meta: "Primary Editor",
        config: {
          title: "settings.json",
          language: "json",
          code: `{
  "editor.tabSize": 2,
  "tailwindCSS.experimental.configFile": "tailwind.config.ts",
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
  "git.enableCommitSigning": true,
  "editor.wordWrap": "on",
  "prisma.pinToPrisma6": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }
}`
        }
      },
      {
        name: "Google Antigravity",
        link: "https://www.antigravity.google/",
        meta: "Agent-first IDE"
      }
    ]
  },
  {
    id: "protocol",
    title: "The Protocol",
    description:
      "Git practices and automation for clean, maintainable codebases.",
    items: [
      { name: "GPG Signing", link: "https://gnupg.org/" },
      {
        name: "Conventional Commits",
        link: "https://www.conventionalcommits.org/"
      },
      {
        name: "Commitizen",
        link: "https://commitizen-tools.github.io/commitizen/"
      },
      { name: "Husky", link: "https://typicode.github.io/husky/" },
      { name: "cz-git", link: "https://cz-git.qbb.sh/" }
    ]
  },
  {
    id: "foundation",
    title: "The Foundation",
    description:
      "Standard tools and libraries that form my development scaffold.",
    items: [
      { name: "Node.js", link: "https://nodejs.org/" },
      { name: "pnpm", link: "https://pnpm.io/" },
      { name: "ESLint", link: "https://eslint.org/" },
      { name: "Prettier", link: "https://prettier.io/" },
      { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
      { name: "Vite", link: "https://vitejs.dev/" }
    ]
  },
  {
    id: "brain",
    title: "The Brain",
    description: "AI-assisted planning and knowledge management systems.",
    items: [
      { name: "NotebookLM", link: "https://notebooklm.google.com/" },
      { name: "Obsidian", link: "https://obsidian.md/" },
      { name: "Todoist", link: "https://todoist.com/" },
      { name: "Eraser.io", link: "https://eraser.io/" },
      { name: "ChatGPT 5.2", link: "https://chatgpt.com/" },
      { name: "Gemini 3 Pro", link: "https://gemini.google.com/" }
    ]
  },
  {
    id: "studio",
    title: "The Studio",
    description: "Tools for visual design and digital asset creation.",
    items: [
      { name: "Figma", link: "https://www.figma.com/" },
      { name: "Photopea", link: "https://www.photopea.com/" }
    ]
  }
];

export const LAST_UPDATED = "Dec 2025";
