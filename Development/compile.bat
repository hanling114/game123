@echo off
cd ../Javascripts/Source
@del /Q ..\check.js >nul 2>&1
@del /Q ..\compiled.js >nul 2>&1
@del /Q ..\merged.js >nul 2>&1
@del /Q "..\..\Mods\details.js" >nul 2>&1

@rem Location of java commandline, a reasonably recent copy of the Oracle JDK is recommended
@rem You can just set this to set JDK= to use the default version of java for your system
set JDK=
@rem set JDK=C:\jdk20\bin\

setlocal enableextensions enabledelayedexpansion
for /d %%G in ("..\..\Mods\*") DO (
	Pushd %%G
	Echo Compiling Mod %%~nxG
	set currv="..\..\Mods\%%~nxG"
	@del /Q "!currv!\Javascripts\merged.js" >nul 2>&1
	@del /Q "!currv!\Javascripts\compiled.js" >nul 2>&1
	@echo off
	if exist "!currv!\Javascripts\details.js" (
		@type "!currv!\Javascripts\details.js" >> "!currv!\..\details.js"
	) else (
		@copy "!currv!\Javascripts\Source\details*.js" "!currv!\.." > nul
		@rem @type "!currv!\Javascripts\details*.js" >> "!currv!\..\details.js"
		@rem @type "!currv!\Javascripts\Source\details*.js" >> "!currv!\..\details.js"
	)
	>"!currv!\Javascripts\merged1.js" (for /r "." %%F in ("!currv!\Javascripts\Source\*.js") do type "%%F") 
	>"!currv!\Javascripts\merged2.js" (for /r "." %%F in ("!currv!\Javascripts\Source\People\*.js") do type "%%F")	
	>"!currv!\Javascripts\merged3.js" (for /r "." %%F in ("!currv!\Javascripts\Source\Places\*.js") do type "%%F")
	@echo on
	%JDK%java -jar ..\..\Development\compiler.jar --compilation_level WHITESPACE_ONLY --js "!currv!\Javascripts\merged*.js" --js_output_file "!currv!\Javascripts\compiled.js"
	@echo off
	@del /Q "!currv!\Javascripts\merged1.js"
	@del /Q "!currv!\Javascripts\merged2.js"
	@del /Q "!currv!\Javascripts\merged3.js"
	Popd
)

@echo Compiling Main Game
>..\merged.js (for /r "." %%F in (*.js) do type "%%F")

@echo on
%JDK%java -jar ..\..\Development\compiler.jar --compilation_level WHITESPACE_ONLY --js ..\merged.js --js_output_file ..\compiled.js
@echo[
@IF %ERRORLEVEL% NEQ 0 goto Failed
@if exist "..\..\..\Android\" (
	@echo Compiled, updating Android
	@echo off
	@del /Q ..\merged.js >nul 2>&1
	copy ..\..\*.html ..\..\..\Android\app\src\main\assets\www /Y >nul
	xcopy ..\*.js ..\..\..\Android\app\src\main\assets\www\Javascripts /Y /C /E /D /i /EXCLUDE:..\..\Development\exclude.txt>nul
	@del /Q ..\..\..\Android\app\src\main\assets\www\Javascripts\merged.js >nul 2>&1
	@rmdir ..\..\..\Android\app\src\main\assets\www\Javascripts\Source /S /Q >nul 2>&1
	xcopy ..\..\UI ..\..\..\Android\app\src\main\assets\www\UI /Y /C /E /D /i >nul
	xcopy ..\..\Help ..\..\..\Android\app\src\main\assets\www\Help\*.html /Y /C /E /D /i >nul
	xcopy ..\..\Credits ..\..\..\Android\app\src\main\assets\www\Credits /Y /C /E /D /i >nul
	xcopy ..\..\Sound ..\..\..\Android\app\src\main\assets\www\Sound /Y /C /E /D /i >nul
	xcopy ..\..\Mods ..\..\..\Android\app\src\main\assets\www\Mods /Y /C /E /D /i /EXCLUDE:..\..\Development\exclude.txt >nul
)
@echo off
@cd ..\..\Development
@echo[
@goto End
:Failed
@echo Compile Failed!
@del /Q ..\merged.js >nul 2>&1
@echo off
@cd ..\..\Development
@echo[
pause
:End

