export const ContainerSvg = ({
  img = "./imgBases/aromas.webp",
  width = 400,
  height = 300,
  duration = 8
}) => {
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg
      viewBox={viewBox}
      className="w-full max-w-md mx-auto"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id="bubbleClip" clipPathUnits="objectBoundingBox">
          {/* Path en proporciones 0–1 para que escale */}
          <path
            d="
              M0.5,0
              C0.7,0.05, 1,0.3, 0.9,0.5
              C1,0.7, 0.7,1, 0.5,0.9
              C0.3,1, 0,0.7, 0.1,0.5
              C0,0.3, 0.3,0.05, 0.5,0
              Z
            "
          >
            {/* Animación de la forma tipo “amoeba” */}
            <animate
              attributeName="d"
              dur={`${duration}s`}
              repeatCount="indefinite"
              values="
                M0.5,0 C0.7,0.05,1,0.3,0.9,0.5 C1,0.7,0.7,1,0.5,0.9 C0.3,1,0,0.7,0.1,0.5 C0,0.3,0.3,0.05,0.5,0 Z;
                M0.5,0 C0.75,0.1,1,0.4,0.85,0.55 C1,0.8,0.65,1,0.45,0.9 C0.25,1,0,0.65,0.15,0.45 C0,0.25,0.25,0.05,0.5,0 Z;
                M0.5,0 C0.7,0.05,1,0.3,0.9,0.5 C1,0.7,0.7,1,0.5,0.9 C0.3,1,0,0.7,0.1,0.5 C0,0.3,0.3,0.05,0.5,0 Z
              "
            />
          </path>
        </clipPath>
      </defs>

      {/* Imagen de fondo recortada */}
      <image
        href={img}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#bubbleClip)"
      />
    </svg>
  );
}
