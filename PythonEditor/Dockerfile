# 1. BUILD STAGE
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . ./

# Publish with Release mode
RUN dotnet publish -c Release -o /app/publish


# 2. RUNTIME STAGE
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy published output
COPY --from=build /app/publish .

# Expose port
EXPOSE 5000

# Configure Kestrel URLs
ENV ASPNETCORE_URLS=http://+:5000

# ENTRYPOINT
ENTRYPOINT ["dotnet", "PythonEditor.dll"]
