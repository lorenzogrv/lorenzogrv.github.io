# lorenzogrv.tech

Arranqué este proyecto en 2021 como uno de los retos prácticos de un bootcamp
de frontend. No llegué a darle "el toque final". En otoño de 2022, empiezo a
reconvertirlo en mi página de marca principal, para <https://lorenzogrv.tech>

## Bitácora

Lo que sigue son anotaciones que fuí haciendo mientras desarrollé el proyecto.
Me gusta escribir, me sirven como diario y referencia, y quizá a alguien le
resulten útiles o guste de leerlas algún día.

### Tramo I: Bootcamp 2011

Las siguientes entradas describen cómo monté este proyecto desde 0, o como me
gusta decir, _from scratch_ (de la nada).

#### Intro

**Lo que me piden es**:

- Usar HTML5, CSS3 y `git`; y más concretamente los modelos flexbox y grid para
  el layout
- El sitio debe tener 3 páginas: Inicio, Contacto, y Perfil. Perfil es opcional,
  pero _let's go_ :rocket:
- Evaluarán:
  - Respetar la nomenclatura HTML5
  - Estructura correcta de archivos HTML y CSS
  - Código limpio e identado
  - Técnicas de diseño CSS

**Me vendré arriba y a mayores**:

- Usaré lorenzogrv.github.io para publicarlo

#### Creando el proyecto

Lo primero es crear un repositorio vacío en github.com. Como voy a usar el sitio
`*.github.com` el nombre en mi caso es `lorenzogrv.github.io`.

```shell
mkdir lorenzogrv.github.io
cd lorenzogrv.github.io
git init
touch README.md
git add README.md
git commit -m "Let's go"
# Por comodidad empleo el acceso vía ssh y ssh-agent
git remote add origin git@github.com:lorenzogrv/lorenzogrv.github.io.git
git push -u origin master
```

#### Usando el sitio *.github.io

La [documentación explica todo paso a paso](https://docs.github.com/es/github/working-with-github-pages/creating-a-github-pages-site):

1. Crear un repositorio cuyo nombre sea el `<root_namespace>.github.io`.
2. En la [configuración del repositorio](https://github.com/lorenzogrv/lorenzogrv.github.io/settings),
   se puede elegir el branch deseado. [Guía aquí](https://docs.github.com/es/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source).
   Al crear un repositorio `*.github.io` parece que se activa por defecto. De
   momento lo que se ve es el contenido de este `README.md` reconvertido a HTML
   por el sistema que emplean por defecto (Jekyll).

#### Estructura de directorios

Para mantenerlo ordenado, usaré como raíz un directorio `public/` contenido en
la raíz del repositorio.

```shell
mkdir -p public/{css,img}
touch public/index.html
touch public/css/styles.css
```

En este caso y como se trata de una práctica, escribiré el html y css "a pelo",
partiendo de ficheros vacíos

##### Power user tip

Voy a descargar el thumbnail de mi gravatar personal empleando `wget` y `jq`.

> No sé si voy a usar el thumbnail, pero me apetecía hacer alguna frikeada con
> el [`jq`](https://stedolan.github.io/jq/), y si alguien lee esto y no lo
> conoce que le heche un ojo. Es alucinantemente rápido, aunque este ejemplo no
> sirva para demostrarlo. Pruébalo para trabajar sobre cientos o miles de
> ficheros `json` y verás.

```shell
# esto llama a la API de gravatar e imprime el JSON en plan "pretty"
wget --no-verbose -O - http://es.gravatar.com/laconbass.json 2>/dev/null | jq
# esto descarga la imagen directamente
wget "$(
  wget --no-verbose -O - http://es.gravatar.com/laconbass.json 2>/dev/null \
  | jq --raw-output '.entry[0].thumbnailUrl'
)" -O public/img/laconbass.thumb
```

Realizo unas ediciones mínimas, y subo los ficheros

```shell
vim public/index.html public/css/styles.css
git add public
git add README.md
git commit -m "Minimal structure"
```

#### Configurando el sitio *.github.com

Por lo que investigué rápidamente sobre [Github Pages](https://pages.github.com/)
la configuración por defecto de jekyll "traga" con un `index.html` en la raíz.

Para no rallarme a buscar un ejemplo de configuración `yml` por el momento para
el setup de CI/CD, muevo los ficheros a la raíz.

```shell
mv public/* .
rm -r public
git add .
git commit -m "Move everything to root"
```

Ahora ya se puede ver lo feo que es el sitio en <https://lorenzogrv.github.io>

#### Dándole unos toques _à la_ single page

Dado que se trata de hacerlo "a pelo" _from scratch_, empiezo a darle unos
toques totalmente a mano. Para ello uso mi amado `vim` y [`budo --dir .
--live`](https://github.com/mattdesl/budo) (`npm i -g budo`).

Usaré alguna foto de [picsum](https://picsum.photos ) para hacer backgrounds y
darle un poco de feel. También voy a cargarme el layout cutre que monté a base
de `absolute`, antes de que alguien aterrice y lo vea XD.

> Despues de un rato...

Sigue siendo feo pero ahora tiene un toque. Aproveché para probar (ya era hora)
el `scroll snap`. De momento toqué los enlaces para navegar vía hash a los `id`,
ya veré luego.

Tiene un mínimo de _responsivity_, pero tengo que decidir aún como voy a ubicar
los elementos en los distintos _breakpoints_. Aún no introducí `@media` queries,
quiero darle una vuelta al contenido html primero.

El _look&feel_ es una mierda aún, tengo que decidir la paleta. De momento dejé
los backgrounds en grayscale.

## Tramo II: Otoño 2022

Llevo un tiempo queriendo montar una web _principal_ (por llamarlo de algún
modo) para mi dominio principal lorenzogrv.tech; y por algún motivo hoy decidí
reconvertir este sitio estático en ella. Aún hay trabajo que hacer aquí.

### Configurar el dominio

Un checkup rápido por en los "Settings" > "Pages" del proyecto me dirige a un
par de enlaces de la doc de gitlab sobre cómo proceder.

1. Añadir un dominio verificado en la **configuración de la cuenta de usuario**.
   En esta [guía](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
   explican detalladamente como añadir y verificar un dominio.
2. Apuntar los registros DNS del dominio a los servidores de gitlab pages.
   En [esta guía](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
   lo explican en detalle. En mi caso, como estoy usando un dominio de primer
   nivel (_apex domain_) utilizo registros `A` y las IPs
3. Configurar el dominio en la configuración de _Pages_ del proyecto.
   Github recomienda apuntar también el subdominio `www` para _apex domains_
   pero quiero el dominio limpio en la url. Como me mostraba un warning,
   redirigí el subdominio (usando 302 Permanently) a la url del dominio
   principal. De este modo eliminé el warning.

### Setup con un tooling moderno

[parcel]: https://parceljs.org/
[vite]: https://vitejs.dev/

Por el momento no haré cosas complicadas pero sí sentaré las bases del tooling
para la web. En un inicio pensé en montarlo con [parcel] dado que últimamente es
lo que estoy usando, pero me apetece dar el paso ya con [vite] y probarlo. Voy a
ello.

```bash
npm init --yes

# Para no ensuciar, veo la estructura aparte
pushd ..
npm create vite@latest # uso la plantilla vanilla
tree vite-project # ...

# Y luego voy adaptando cosillas
popd
npm install --save-dev vite
vim package.json
# set private=true
# set type=module
# add basic scripts (start, build, preview)
mkdir public

# Retoco conforme a lo que veo interesante
vim index.html
# Descubro alguna cosa interesante que no conocía
cat ../vite-project/styles.css
# Ediciones, ediciones, ediciones ...
```

- [x] Retocar la cabecera
- [x] Retocar los textos
- [x] Tunear el año del ©
- [x] Tunear el texto del about
- [x] Mejorar la legibilidad
- [x] Animar la navegación
- [x] Substituír la sección contacto por otra cosa

### Publicación usando github actions

Toca probar ya los github actions. Salieron poco después de cambiarme a Gitlab
precisamente por el CI, y me apetece ver cómo va. Algo tan simple como un deploy
estático de pages es perfecto para probar.

Para hacerlo más interesante usé estados de `history` para ver cómo puedo
corregir los 404.

En [esta guía](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
como proceder. En la propia guía no hay ejemplos de código, por lo que voy a
investigar un poco y probar siguiendo mi intuición...

Después de un poco de prueba-error por tema de permisos y desconocimiento total
de cómo funciona actions, pude crear un workflow que realiza la acción deseada.

> La manera de encontrar una buena guía fué usar uno de los workflows que me
> recomendaba gh en la configuración de pages para ver una plantilla con un
> ejemplo funcional.

Una vez funcionando, compruebo que me devuelve un 404 si voy directo a una url
que no sea la raíz. En la [doc de github](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
explican que se puede usar un `404.html` customizado. Probaré ahora con el truco
clásico de duplicar el `index.html`

Después de limpiar todo lo innecesario, el resultado es:

```yaml
---
# https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Build and Deploy to GitHub Pages

on:
  push:
    branches: ["master"]

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  id-token: write
  pages: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  pages-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16.x
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: cp dist/index.html dist/404.html
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1.0.4
        with:
          path: dist/  # Path of the directory containing the static assets.
      - id: deployment
        uses: actions/deploy-pages@v1.2.1
```

El truco funcionó, pero no mantiene el path en la URL. Tendré que darle una
vuelta en otra ocasión para que cargue la sección que toca, pero por el momento
me sirve

### TODOs

- [ ] Fix acceso directo via URL (404)
- [ ] Rework del menú (Necesitaré más elementos)
- [ ] Portfolio (Molaría algo en plan galería)
- [ ] Tech Skills (Molaría algo en plan ficha de personaje)
- [ ] i18n
- [ ] Tema capacitación

> Estos los definí al final del Tramo II, ahora que arranco el III voy a revisar
> prioridades. Marcaré lo que se haga, pero no me preocupará lo que no

## Tramo III: Diciembre 2023

Ya ha pasado un año desde el último *sprint*, y decidí que toca dar otro paso.
Para centrarme un poco toca definir unos targets:

- Aspecto
  - Reemplazar el avatar por el nuevo que estoy usando. Quizá darle presencia en
    la landing
  - Remplazar el aspecto oscuro de la landing con algo más vivo. Quizá incluso
    utilizar IA para generar un fondo.
- Usabilidad
  - En su momento quise jugar con el scroll horizontal, pero ahora lo veo más
    un defecto de UX, especialmente para móvil. Le daré una vuelta, intentando
    complicarme lo mínimo.
- Contenido
  - Como mínimo quiero que ya contenga un overview de mi experiencia laboral y
    mi formación. Un plus sería un prototipo del porfolio
  - Últimamente e investigado sobre [astro] y valoraré un respec del toolset.
    A futuro quiero que el contenido crezca con facilidad, y como *side-effect*
    lo probaría en la práctica.

    Su funcionalidad de colecciones me parece interesante para implementar un
    timeline sobre mi experiencia y mi formación, así como para mantener un SSOT
    de proyectos para el portfolio y también el set de skills y herramientas

[astro]: https://astro.build/

### Respec a [astro]

Definitivamente empezaré por aquí. El cambio de herramienta pasa por configurar
mi querido vim en primer lugar

- [Setup para vim](https://docs.astro.build/en/editor-setup/#other-code-editors)
  - [sintax plugin](https://github.com/wuelnerdotexe/vim-astro)
  - [LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro)
  - [TreeSitter](https://github.com/virchau13/tree-sitter-astro)

Luego puedo seguir [la doc de setup manual](https://docs.astro.build/en/install/manual/)
sin mucho problema.

Adaptar el código no supone ningún problema dado que es vanilla puro. Una de
las claves de astro es que su sintaxis me permitirá reescribir poco, será más
bien un trabajo de split y organizar. Que el layout esté en vanilla CSS también
facilitará esta tarea.

Indirectamente consigo fixear la navegación por paths sin *trickery* del que
suelo usar.
