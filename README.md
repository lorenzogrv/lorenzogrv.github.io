# lorenzogrv.github.io

Arranco este proyecto como uno de los retos prácticos del bootcamp de frontend

[[_TOC_]]

## Intro

**Lo que me piden es**:

- Usar HTML5, CSS3 y `git`; y más concretamente los modelos flexbox y grid para el layout
- El sitio debe tener 3 páginas: Inicio, Contacto, y Perfil. Perfil es opcional, pero _let's go_ :rocket:
- Evaluarán:
  - Respetar la nomenclatura HTML5
  - Estructura correcta de archivos HTML y CSS
  - Código limpio e identado
  - Técnicas de diseño CSS

**Me vendré arriba y a mayores**:

- Usaré lorenzogrv.github.io para publicarlo



## Creando el proyecto

Lo primero es crear un repositorio vacío en github.com. Como voy a usar el sitio `*.github.com` el nombre en mi caso es `lorenzogrv.github.io`.

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



## Usando el sitio *.github.io

La [documentación explica todo paso a paso](https://docs.github.com/es/github/working-with-github-pages/creating-a-github-pages-site):

1. Crear un repositorio cuyo nombre sea el `<root_namespace>.github.io`.
2. En la [configuración del repositorio](https://github.com/lorenzogrv/lorenzogrv.github.io/settings), se puede elegir el branch deseado. [Guía aquí](https://docs.github.com/es/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source). Al crear un repositorio `*.github.io` parece que se activa por defecto. De momento lo que se ve es el contenido de este `README.md` reconvertido a HTML por el sistema que emplean por defecto (Jekyll).



## Estructura de directorios

Para mantenerlo ordenado, usaré como raíz un directorio `public/` contenido en la raíz del repositorio.

```shell
mkdir -p public/{css,img}
touch public/index.html
touch public/css/styles.css
```

En este caso y como se trata de una práctica, escribiré el html y css "a pelo", partiendo de ficheros vacíos

### Power user tip

Voy a descargar el thumbnail de mi gravatar personal empleando `wget` y `jq`.

> No sé si voy a usar el thumbnail, pero me apetecía hacer alguna frikeada con el [`jq`](https://stedolan.github.io/jq/), y si alguien lee esto y no lo conoce que le heche un ojo. Es alucinantemente rápido, aunque este ejemplo no sirva para demostrarlo. Pruébalo para trabajar sobre cientos o miles de ficheros `json` y verás.

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



## Configurando el sitio *.github.com

Por lo que investigué rápidamente sobre [Github Pages](https://pages.github.com/) la configuración por defecto de jekyll "traga" con un `index.html` en la raíz.

Para no rallarme a buscar un ejemplo de configuración `yml` por el momento para el setup de CI/CD, muevo los ficheros a la raíz.

```shell
mv public/* .
rm -r public
git add .
git commit -m "Move everything to root"
```

Ahora ya se puede ver lo feo que es el sitio en https://lorenzogrv.github.io



## Dándole unos toques _à la_ single page

Dado que se trata de hacerlo "a pelo" _from scratch_, empiezo a darle unos toques totalmente a mano. Para ello uso mi amado `vim` y [`budo --dir . --live`](https://github.com/mattdesl/budo) (`npm i -g budo`).

Usaré alguna foto de [picsum](https://picsum.photos ) para hacer backgrounds y darle un poco de feel. También voy a cargarme el layout cutre que monté a base de `absolute`, antes de que alguien aterrice y lo vea XD.

> Despues de un rato...

Sigue siendo feo pero ahora tiene un toque. Aproveché para probar (ya era hora) el `scroll snap`. De momento toqué los enlaces para navegar vía hash a los `id`, ya veré luego.

Tiene un mínimo de _responsivity_, pero tengo que decidir aún como voy a ubicar los elementos en los distintos _breakpoints_. Aún no introducí `@media` queries, quiero darle una vuelta al contenido html primero.

El _look&feel_ es una mierda aún, tengo que decidir la paleta. De momento dejé los backgrounds en grayscale.