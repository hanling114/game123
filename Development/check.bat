@echo off
cd ../Javascripts/Source
@del /Q ..\check.js >nul 2>&1
@del /Q ..\merged.js >nul 2>&1
@del /Q ..\compiled.js >nul 2>&1

@rem Location of java commandline, a reasonably recent copy of the Oracle JDK is recommended
@rem You can just set this to set JDK= to use the default version of java for your system
set JDK=
@rem set JDK=C:\jdk20\bin\

setlocal enableextensions enabledelayedexpansion
for /d %%G in ("..\..\Mods\*") DO (
	Pushd %%G
	Echo Checking Mod %%~nxG
	set currv="..\..\Mods\%%~nxG"
	@echo on
	%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js "!currv!\Javascripts\Source\*.js" --js_output_file ..\check.js
	@del /Q ..\check.js >nul 2>&1
	if exist "!currv!\Javascripts\Source\People\" ( %JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js "!currv!\Javascripts\Source\People\*.js" --js_output_file ..\check.js )
	@del /Q ..\check.js >nul 2>&1
	if exist "!currv!\Javascripts\Source\Places\" ( %JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js "!currv!\Javascripts\Source\Places\*.js" --js_output_file ..\check.js )
   @echo off
   @del /Q ..\check.js >nul 2>&1
	Popd
)

echo:
echo Syntax check of place code
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js Places\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

echo:
echo Check People code
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js People\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

echo:
echo Check Visions code
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js ..\Visions\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js ..\Visions\Explicit\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

echo:
echo Syntax check of common code
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js *.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

echo:
echo Syntax check of non-compiled code
@echo on
%JDK%java -jar ..\..\Development\compiler.jar --jscomp_warning=missingReturn --jscomp_warning=undefinedNames --compilation_level SIMPLE --js ..\*.js --js_output_file ..\check.js
@echo off
@del /Q ..\check.js >nul 2>&1

pause