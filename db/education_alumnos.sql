USE [DB_A45479_EXPRESS]
GO

/****** Object:  Table [dbo].[EDUCATION_ALUMNOS]    Script Date: 9/09/2019 10:51:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[EDUCATION_ALUMNOS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TOKEN] [varchar](100) NULL,
	[CODIGO] [varchar](50) NULL,
	[NOMBRES] [varchar](75) NULL,
	[APELLIDOS] [varchar](75) NULL,
	[FN_DIA] [int] NULL,
	[FN_MES] [int] NULL,
	[FN_ANIO] [int] NULL,
	[FECHANACIMIENTO] [date] NULL,
	[DIRECCION] [varchar](255) NULL,
	[SEXO] [varchar](9) NULL,
	[ENCARGADO] [varchar](200) NULL,
	[MADRE] [varchar](200) NULL,
	[PADRE] [varchar](200) NULL,
	[TELCASA] [numeric](8, 0) NULL,
	[TELCELULAR] [numeric](8, 0) NULL,
	[OBS] [varchar](255) NULL,
	[CLAVE] [varchar](50) NULL,
 CONSTRAINT [PK_EDUCATION_ALUMNOS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

